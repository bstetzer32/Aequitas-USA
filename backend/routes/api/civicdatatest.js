const fetch = require('node-fetch')
const faker =  require('faker')
const { User, Office, Leadership, Region } = require('../../db/models');

const testAddress = {addressLineOne: '434 Emerald Drive', city:'Pittsburgh', state: 'PA', zip: '15237'}
async function fetchData(address) {
    const civicDataFetch = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDkAj7-ZbjTU2-pLN5bJed7Jph_1LmlsW8&address=${address.addressLineOne}${address.city}${address.state}${address.zip}`)
    const civicData = await civicDataFetch.json()
    return civicData
}

fetchData(testAddress)
    .then(res => {
        const {divisions, offices: positions, officials} = res;
        const state = testAddress.state
        const regions = []
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
                    region.officeIndices.forEach(officeIndex => {
                        positions[officeIndex].region = region.name + ' ' + state
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
                password,
                authenticated: false
            }) 
        });
        const officeArray = Object.values(offices)
        let databaseRegions = []
        // regions.forEach(async region => {
        //     if (region.name && region.level) {
        //         const databaseRegion = await Region.create(region)
        //         databaseRegions.push(databaseRegion)
        //     }
        // });
        const databaseLeaders = [];
        // leaders.forEach(async leader => {
        //     try {
        //         const user = await User.signup(leader);
        //         console.log(user)
        //         databaseLeaders.push(user)
        //     } catch (error) {
        //         console.log(error)
        //     }

        // });
        console.log(leaders)
        
    })