const 
  STRING_HELPERS = {
    getFirstLine: (str) => str.split("\n")[0].trim(),

    isEmpty: (str) => (str.length === 0 || !str.trim())
  }

// HELPERS.strings = {

//   getFirstLine: (str) => str.split("\n")[0].trim(),

//   isEmpty: (str) => (str.length === 0 || !str.trim())
// }

// HELPERS.forms = {
//   shiftReturn: (e) => (e.which === 13 && e.shiftKey)
// }

// AppLib.lists = {
//   lockItemCount: (totalQty, displayedQty) => totalQty <= displayedQty? totalQty : displayedQty
// }

// AppLib.notes = {
//   title: {
//     maxLength: 100
//   },
//   content: {
//     maxLength: 25000
//   }
// }

export { STRING_HELPERS }
