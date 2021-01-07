const createGMI = require('./createGMI');
const createXML = require('./createXml');
const handleIncomingFile = require('./handleIncomingFile');

async function completeConversionProcess(addsInputFile, gmiOutputDir, addsOutputDir){
    try {
        const xamlStr =  await handleIncomingFile(addsInputFile, `${gmiOutputDir}FAC_UPDATE_NEW_xaml.txt`);

        const GMI = await createGMI(`${gmiOutputDir}FAC_UPDATE_NEW_xaml.txt`,`${gmiOutputDir}COMPLETE_GMI_UPDATE.txt`);

        const addsXml = await createXML(`${gmiOutputDir}COMPLETE_GMI_UPDATE.txt`, `${addsOutputDir}COMPLETE_GMI_UPDATE.xml`);
        // console.log(addsXml)
        return addsXml
    } catch (error) {
        console.error(error.message)
    }
}

// console.log('=============================')
// console.log(Promise.resolve(completeConversionProcess(ADDS_INPUT_FILE, GMI_OUTPUT_DIR, ADDS_OUTPUT_DIR).then(function(data){
//     console.log(data)
// })))

module.exports = completeConversionProcess