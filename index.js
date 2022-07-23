"use strict";

const btnConvert = document.getElementById("convert-btn");

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

function roundDown(num1, num2) {
  const roundDownToThreeDec = [
    Math.floor(num1 * 1000) / 1000,
    Math.floor(num2 * 1000) / 1000,
  ];
  return roundDownToThreeDec;
}

// calculate to the unit type and vice versa:
//   - meeters to feet
//   - liters to pounds
//   - kilos to pounds
function calcUnits(num) {
  const [mtrsToFt, ftToMtrs] = [num * 3.281, num / 3.281];
  const [ltrsToGl, glToLtrs] = [num * 0.264, num / 0.26];
  const [kgToPds, pdsToKg] = [num * 2.204, num / 2.204];
  const units = [mtrsToFt, ftToMtrs, ltrsToGl, glToLtrs, kgToPds, pdsToKg];

  console.log(units);

  // after conversion of units:
  //  - round down to 3 decimal points
  const [meterToFeet, feetToMeters] = roundDown(units[0], units[1]);
  const [literToGallon, gallonsToLiters] = roundDown(units[2], units[3]);
  const [kiloToPound, pountToKilo] = roundDown(units[4], units[5]);

  return [
    { meterToFeet, feetToMeters },
    { literToGallon, gallonsToLiters },
    { kiloToPound, pountToKilo },
  ];
}

function spanContent(
  spanEle,
  inputValue,
  value1,
  value2,
  unitType1,
  unitType2
) {
  // assign copies for unitType1 and unitType2 respectively
  let unitType1Copy = unitType1;
  let unitType2Copy = unitType2;

  // -- if input or unit value is greater than 1
  //    - assign 's' to the end of string

  // the exception: feet - should remain unchanged i.e no 's' at the end
  if (inputValue > 1) {
    if (unitType1 === "meter" && unitType2 === "feet") {
      unitType1 = unitType1 + "s";
    } else {
      unitType1 = unitType1 + "s";
      unitType2Copy = unitType2Copy + "s";
    }
  }

  if (value1 > 1) {
    if (unitType2 !== "feet") {
      unitType2 = unitType2 + "s";
    } else {
      unitType2 = unitType2.replace(/s$/, "");
    }
  }

  if (value2 > 1) {
    unitType1Copy = unitType1Copy + "s";
  }

  spanEle.textContent = `${inputValue} ${unitType1} = ${value1} ${unitType2} |
    ${inputValue} ${unitType2Copy} = ${value2} ${unitType1Copy}`;

  return spanEle;
}

function renderUnits(inputValue) {
  const arr = calcUnits(inputValue);
  const li = document.querySelectorAll(".units");
  let unit = "";
  for (let i = 0; i < li.length; i++) {
    // traverse through the DOM and get span element
    const span = li[i].querySelector("span");

    // i === 0 then grab first span element
    // generate the span content
    if (i === 0) {
      unit = spanContent(
        span,
        inputValue,
        arr[i].meterToFeet,
        arr[i].feetToMeters,
        "meter",
        "feet"
      );
    } else if (i === 1) {
      unit = spanContent(
        span,
        inputValue,
        arr[i].literToGallon,
        arr[i].gallonsToLiters,
        "liter",
        "gallon"
      );
    } else if (i === 2) {
      unit = spanContent(
        span,
        inputValue,
        arr[i].kiloToPound,
        arr[i].pountToKilo,
        "kilo",
        "pound"
      );
    }
    li[i].append(unit);
  }
}

/* Requirements:
   - Generate all conversions when the user clicks 'Convert'
   - Round the numbers down to three decimal places
 */

btnConvert.addEventListener("click", function () {
  const mainInput = document.getElementById("main-input");
  const input = Number(mainInput.value);
  renderUnits(input);
});
