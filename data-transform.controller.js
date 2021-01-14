const { json } = require("body-parser");

exports.transformDataJSON = function (payloadData, refData) {
    try {
        return getPayloadValueJson(payloadData, refData);
    } catch (error) {
        console.log("Error in controller file", err)
        throw new Error(error.message)
    }
}

function getPayloadValueJson(payloadData, refData) {
    payloadData.value.forEach(val => {
        if (val.valueType == 'string') {
            replaceRefValue(val, refData)
        } else {
            getPayloadValueJson(val, refData)
        }
    });
    return payloadData
}

function replaceRefValue(objData, refData) {
    if (objData.value.includes('REF')) {
        let strval1 = objData.value.split('{')
        let strval2 = strval1[1].split('}')
        objData.value = refData[strval2[0]] + '' + strval2[1]
    }
}