const fetch = require('node-fetch')
const faker =  require('faker')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');
const { User, Office, Leadership, Region } = require('../db/models');

const testAddress = {addressLineOne: '434 Emerald Drive', city:'Pittsburgh', state: 'PA', zip: '15237'}

function fetchOfficialData () {
    const citizenId = 1
    async function fetchData(address) {
        const civicDataFetch = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDkAj7-ZbjTU2-pLN5bJed7Jph_1LmlsW8&address=${address.addressLineOne}${address.city}${address.state}${address.zip}`)
        const civicData = await civicDataFetch.json()
        
        const {divisions, offices: positions, officials} = civicData;
        // let existingOffices = await Office.findAll()
        // existingOffices = existingOffices.map(office => )
        // const existingUsers = await User.findAll({where: {
        //     id: {
        //         [Op.in]: a
        //     }
        // }})

        const state = address.state
        let regions = []
        const offices = {}
        const leaders = []
        for (const division in divisions) {
            if (Object.hasOwnProperty.call(divisions, division)) {
                const el = divisions[division];
                regions.push(el)
            }
        }
        regions.map(region => {
            if (region.officeIndices) {
                region.level = positions[region.officeIndices[0]].levels[0];
                if (region.level === 'administrativeArea2') {
                    region.name = region.name + ' ' + state
                    region.officeIndices.forEach(officeIndex => {
                        positions[officeIndex].region = region.name
                        delete positions[officeIndex].levels 
                        delete positions[officeIndex].divisionId
                        delete positions[officeIndex].roles 
                        if (positions[officeIndex].officialIndices.length === 1) {
                            offices[positions[officeIndex].officialIndices[0]] = positions[officeIndex]
                            delete offices[positions[officeIndex].officialIndices[0]].officialIndices
                        } else {
                            positions[officeIndex].officialIndices.forEach((position, i) => {
                                offices[positions[officeIndex].officialIndices[i]] = {
                                    name: `${positions[officeIndex].name} ${i + 1}`,
                                    region: positions[officeIndex].region
                                }
                            });
                            delete positions[officeIndex].officialIndices
                        } 
                    });
                } else {
                    region.officeIndices.forEach(officeIndex => {
                        positions[officeIndex].region = region.name   
                        delete positions[officeIndex].levels 
                        delete positions[officeIndex].divisionId 
                        delete positions[officeIndex].roles    
                        if (positions[officeIndex].officialIndices.length === 1) {
                            offices[positions[officeIndex].officialIndices[0]] = positions[officeIndex]
                            delete offices[positions[officeIndex].officialIndices[0]].officialIndices
                        } else {
                            positions[officeIndex].officialIndices.forEach((position, i) => {
                                offices[positions[officeIndex].officialIndices[i]] = {
                                    name: `${positions[officeIndex].name} ${i + 1}`,
                                    region: positions[officeIndex].region
                                }
                            });
                            delete positions[officeIndex].officialIndices
                        } 
                    });
                }
                delete region.officeIndices
                return region
            }
        });
        officials.forEach(official => {
            const randomNumber = Math.floor(Math.random() * 1000000)
            let email;
            if (official.emails) {
                email = official.emails[0]
            } else {
                email = `${randomNumber}@fake-email.com`
            }
            const password = faker.internet.password()
            const hashedPassword = bcrypt.hashSync(password)
            const name = official.name.split(' ')
            const firstName = name[0]
            let lastName
            if(name[name.length - 1].includes('.') || name[name.length - 1].includes('II')){
                lastName = name[name.length - 2]
            } else {
                lastName = name[name.length - 1]
            }
            const username = firstName + lastName + randomNumber
            leaders.push({ 
                firstName,
                lastName,
                username,
                email,
                hashedPassword,
                authenticated: false
            }) 
        });
        regions = regions.filter(region => region.level !== undefined)
        const officeArray = Object.values(offices)
            // officeArray.forEach((office) => {
            //     officeRegion = regions.filter(region => region.name === office.region)
            //     office.regionId = officeRegion.id
            //     delete office.region
            // });
        // console.log(regions)
        // console.log(officeArray)
        let dataReturn = {};
        try {
            var databaseRegions = await Region.bulkCreate(regions, {updateOnDuplicate: ["name"], returning: true})
            dataReturn.regions = databaseRegions
        } catch (error) {
            // console.log(error)
        }
        try {
            var databaseLeaders = await User.bulkCreate(leaders);
            dataReturn.leaders = databaseLeaders
            officeArray.forEach((office, i) => {
                office.incumbantId = databaseLeaders[i].dataValues.id
            });
        } catch (error) {
            // console.log(error)
        }
        try {
            var databaseOffices = await Office.bulkCreate(officeArray)
            dataReturn.offices = databaseOffices
        } catch (error) {
            console.log(error)
        } 
        try {
            var leaderships = []
            databaseOffices.forEach(office => {
                leaderships.push({citizenId: citizenId, officeId: office.id })
            });
            console.log(leaderships)
            var databaseLeaders = await Leadership.bulkCreate(leaderships) 
            dataReturn.leaderships = databaseLeaders
        } catch (error) {
            console.log(error)
        } finally {
        console.log(officeArray)
        return dataReturn

        }
    }
    const fetchOfficialDataReturn = fetchData(testAddress)
    return fetchOfficialDataReturn
}

    module.exports = {fetchOfficialData}