const fetch = require('node-fetch')
const faker =  require('faker')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');
const { User, Office, OfficeSubscription, RegionSubscription, Region } = require('../db/models');



function fetchOfficialData ({citizenId, addressLineOne, city, state, zip}) {
    async function fetchData() {
        const civicDataFetch = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDkAj7-ZbjTU2-pLN5bJed7Jph_1LmlsW8&address=${addressLineOne}${city}${state}${zip}`)
        const civicData = await civicDataFetch.json()
        
        const {divisions, offices: positions, officials} = civicData;
        const existingOffices = await Office.findAll()
        const existingLeaderIds = existingOffices.map(office => office.incumbantId)
        const existingOfficeNames = existingOffices.map(office => office.name)
        const existingLeaders = await User.findAll({where: {
            id: {
                [Op.in]: existingLeaderIds
            }
        }})
        const existingRegionIds = existingOffices.map(office => office.region)
        // console.log(existingOffices)
        const existingRegionUpload = await Region.findAll()
        const existingRegionUploadNames = existingRegionUpload.map(region => region.name)
        const existingRegions = await Region.findAll({where: {
            name: {
                [Op.in]: existingRegionIds
            }
        }})
        // console.log(existingOffices)
        const existingRegionNames = existingRegions.map(region => region.name)
        // console.log(existingRegionNames)
        const existingLeaderNames = existingLeaders.map(leader => leader.username)
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
                if (!positions[region.officeIndices[0]].levels) {
                    delete region.officeIndices
                    delete positions[region.officeIndices]
                } else {
                region.level = positions[region.officeIndices[0]].levels[0];
                }
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
                } else if (region.officeIndices) {
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
        let filteredOfficials = officials.filter(official => official.phones && official.phones[0])
        // console.log(filteredOfficials)
        filteredOfficials.forEach(official => {
            // console.log(official.phones)
            const name = official.name.split(' ')
            const firstName = name[0]
            let lastName
            if(name[name.length - 1].includes('.') || name[name.length - 1].includes('II')){
                lastName = name[name.length - 2]
            } else {
                lastName = name[name.length - 1]
            }
            const phone = official.phones[0].split('')
            const phoneNumber = phone.filter(num => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(num))
            const userTag = phoneNumber.join('')
            const username = firstName + lastName + userTag
            // console.log(userTag)
            const randomNumber = Math.floor(Math.random() * 1000000)
            let email;
            if (official.emails) {
                email = official.emails[0]
            } else {
                email = `${username}@placeholder-email.com`
            }
            const password = faker.internet.password()
            const hashedPassword = bcrypt.hashSync(password)
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
        let regionOfficeCreate = [...regions]
        regionOfficeCreate = regionOfficeCreate.map(region => region.name)
        regions = regions.filter(region => !existingRegionUploadNames.includes(region.name))
        // console.log(regions)
        const officeArray = Object.values(offices)
            // officeArray.forEach((office) => {
            //     officeRegion = regions.filter(region => region.name === office.region)
            //     office.regionId = officeRegion.id
            //     delete office.region
            // });
        // console.log(regions)
        let officeArrayNames = officeArray.map(office => office.name)
        // console.log(officeArrayNames)
        let dataReturn = {};
        try {
            var databaseRegions = await Region.bulkCreate(regions, {updateOnDuplicate: ["name"], returning: true})
            dataReturn.regions = databaseRegions
        } catch (error) {
            console.log(error)
        }
        // console.log(existingLeaderNames)
        const allUsers = await User.findAll()
        const allUserNames = allUsers.map(user => user.username)
        let leaderCreate = leaders.filter(leader => !allUserNames.includes(leader.username))
        // console.log(leaders)
        try {
            var databaseLeaders = await User.bulkCreate(leaderCreate);
            // console.log(databaseLeaders)
            dataReturn.leaders = databaseLeaders

        } catch (error) {
            console.log(error)
        }
        // let b;
        // try {
        //     const a = await Office.findAll({where: {
        //         name: {
        //             [Op.in]: officeArrayNames
        //         }
        //     }})
        //     b = a.map(a => a.dataValues.incumbantId)
        //     console.log(b)
        // } catch (error) {
            
        // }
        const officeCreate = officeArray.filter(office => !existingOfficeNames.includes(office.name))
        officeCreate.forEach((office, i) => {
            office.incumbantId = databaseLeaders[i].dataValues.id
        });
        console.log(officeCreate)
        try {
            var databaseOffices = await Office.bulkCreate(officeCreate)
            dataReturn.offices = databaseOffices
        } catch (error) {
            console.log(error)
        } 
        let existingRegions1
        try {
            existingRegions1 = await Region.findAll({where: {
                name: {
                    [Op.in]: subscriptionRegions
                }
            }})
            // console.log(existingRegions1)
        } catch (error) {
            console.log(error)
        } 
        let existingOffices1
        try {
            existingOffices1 = await Office.findAll({where: {
                name: {
                    [Op.in]: officeArrayNames
                }
            }})
            // console.log(existingRegions1)
        } catch (error) {
            console.log(error)
        }
        try {

            // console.log(userRegions)
            var arr = []
            
            existingRegions1.forEach(region => {
                arr.push({subscriberId: citizenId, regionId: region.id, leader: true})
            })

            var databaseLeaders = await RegionSubscription.bulkCreate(arr) 
            dataReturn.databaseLeaders = databaseLeaders
        } catch (error) {
            console.log(error)
        } 
        try {

            // console.log(userRegions)
            var arr1 = []
            
            existingOffices1.forEach(office => {
                arr1.push({subscriberId: citizenId, officeId: office.id})
            })

            var databaseLeaders = await OfficeSubscription.bulkCreate(arr1) 
            dataReturn.databaseLeaders = databaseLeaders
            try {
                const user = await User.findByPk(citizenId)
                user.addressLineOne = addressLineOne
                user.city = city
                user.state = state
                user.zipCode = zip
                user.authenticated = true
                var authUser = await user.save()
                return authUser
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        } 

        finally {
            // console.log(subscriptionRegions)
            return dataReturn

        }
    }
    const fetchOfficialDataReturn = fetchData()
    return fetchOfficialDataReturn
}

    module.exports = {fetchOfficialData}