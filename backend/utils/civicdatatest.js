const fetch = require('node-fetch')
const faker =  require('faker')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');
const { User, Office, RegionSubscription, Region } = require('../db/models');

const testAddress = {addressLineOne: '434 Emerald Drive', city:'Pittsburgh', state: 'PA', zip: '15237'}

function fetchOfficialData () {
    const citizenId = 1
    async function fetchData(address) {
        const civicDataFetch = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDkAj7-ZbjTU2-pLN5bJed7Jph_1LmlsW8&address=${address.addressLineOne}${address.city}${address.state}${address.zip}`)
        const civicData = await civicDataFetch.json()
        
        const {divisions, offices: positions, officials} = civicData;
        const existingOffices = await Office.findAll()
        const existingLeaderIds = existingOffices.map(office => office.incumbantId)
        const existingLeaders = await User.findAll({where: {
            id: {
                [Op.in]: existingLeaderIds
            }
        }})
        const existingRegionIds = existingOffices.map(office => office.region)
        const existingRegions = await Region.findAll({where: {
            name: {
                [Op.in]: existingRegionIds
            }
        }})
        const existingRegionNames = existingRegions.map(region => region.name)
        const existingLeaderNames = existingLeaders.map(leader => leader.username)
        const state = address.state
        let regions = []
        const offices = {}
        let leaders = []
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
        console.log(officials)
        officials.forEach(official => {
            const userTag = official.phones[0].split(' ')[0]
            const randomNumber = Math.floor(Math.random() * 1000000)
            let email;
            if (official.emails) {
                email = official.emails[0]
            } else {
                email = `${userTag}@placeholder-email.com`
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
            const username = firstName + lastName + userTag
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
        subscriptionRegions = []
        regions.forEach(region => {
            subscriptionRegions.push(region.name)
        });
         console.log(regions.filter(region => existingRegionNames.includes(region.name)))
        regions = regions.filter(region => existingRegionNames.includes(region.name))
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
        leaders = leaders.filter(leader => existingLeaderNames.includes(leader.name))
        try {
            var databaseLeaders = await User.bulkCreate(leaders);
            dataReturn.leaders = databaseLeaders
            officeArray.forEach((office, i) => {
                office.incumbantId = databaseLeaders[i].dataValues.id
            });
        } catch (error) {
            // console.log(error)
        }
        const officeCreate = officeArray.filter(office => existingLeaderIds.includes(office.incumbantId))
        try {
            var databaseOffices = await Office.bulkCreate(officeCreate)
            dataReturn.offices = databaseOffices
        } catch (error) {
            console.log(error)
        } 
        try {
            const arr = []
            const userRegions = await Region.findAll({where:{
                name:{
                    [Op.in]: subscriptionRegions
                }
            }})
            userRegions.forEach(region => {
                arr.push({subscriberId: citizenId, regionId: region.id})
            })
            console.log(arr)
            var databaseLeaders = await RegionSubscription.bulkCreate(arr) 
            dataReturn.userRegions = userRegions
        } catch (error) {
            console.log(error)
        } finally {
        return dataReturn

        }
    }
    const fetchOfficialDataReturn = fetchData(testAddress)
    return fetchOfficialDataReturn
}

    module.exports = {fetchOfficialData}