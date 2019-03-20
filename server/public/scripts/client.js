/*******************************************************************************
*** Globals ********************************************************************
*******************************************************************************/
// Declare a class of type Book to instantiate new Books
class Item {
  constructor( title, author, published ) {
    this.title = title;
    this.author = author;
    this.published = published;
  }
}

/*******************************************************************************
*** APPLICATION MAIN ***********************************************************
*******************************************************************************/

// initialize the page
$( document ).ready( readyNow );
renderDOM( 0 );


/*******************************************************************************
*** FUNCTION DEFINITIONS * A-Z *************************************************
*******************************************************************************/

// DOM initialization, event listeners
function readyNow() {
  console.log( 'in readyNow' );
}

// - Set input vals to ''
// - Focus on first input field
function clearInputFields( userInputs ) {
  $('#id1').val('');
  $('#id2').val('');
  $('#id3').val('');
  $('#id1').focus();
}

// - Instantiate a new item using constructor with user inputs
function createItem() {
  let userInputs = new Item( $('#in-title').val(), $('#in-author').val(), $('#in-published').val() );
  console.log( 'user entered:',userInputs );
  return userInputs;
}

function renderDOM( itemsArr ) {
  console.log( 'rendering DOM' );
  clearInputFields();
  for ( let item of itemsArr ) {
    let $tr = $(
      `<tr>
        <td>${item.title}</td>
        <td>${item.author}</td>
        <td>${item.published.toLocaleString()}</td>
      </tr>`
    );
    $('#tbl-books').append($tr);
  }
}

// User input validation
function validate( userInput ) {
  
  // test each property of itemInfo object for empty strings.
  console.log( 'validating user inputs' );
  if ( userInput.title === '' || userInput.author === '' || userInput.published === '' ) {
    console.log( 'user input validation test failed' );
    alert( 'INCOMPLETE DATA! Please do not leave any fields empty.' );
    return false;
  }
  // if itemInfo passes validation
  console.log( 'user inputs are valid.' );
  return true;
}

/*******************************************************************************
*** HTTP REQUESTS * A-Z ********************************************************
*******************************************************************************/

function getSomething() {
  $.ajax({
    method: 'GET',
    url: '/items'
  })
    .then( function(response) {
      console.log(`Response from get all songs`, response);
      renderDOM(response);
    })
    .catch( function(error) {
      console.log( 'Something happened with GET request' );
      alert( `Couldn't get items. Check Console for more details` );
    });
}

function postSomthing() {
  
  let newItem = createItem();
  
  // test user inputs for invalid data
  if ( validate( newItem ) === false ) {
    return;
  }
  
  $.ajax({
    method: 'POST',
    url: '/items',
    data: newItem
  })
  .then( function( response ) {
    getSomething();
  })
  .catch( function( error ) {
    console.log( `Error adding item ${ newItem }`, error );
    console.log( 'Something happened with POST request' );
    alert( `Sorry! Could not add the new item. Check Console for more details` );
  });
}