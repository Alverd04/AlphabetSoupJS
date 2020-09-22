// Environment variables

var board_size = 9
var board = createBoard(board_size)



// Main 
createHtmlBoard(board)

$('#solve-btn').click({board}, function () { 
    var user_input = $('#input').val().toUpperCase()
    solve(user_input, board)
});




// Functions 


function createBoard(board_size){
    var board = []
    for(var i = 0; i < board_size; i++){
        board.push([])
        for(var j = 0; j < board_size; j++){
            board[i].push(String.fromCharCode(65 + Math.floor(Math.random()*24)))
        }
    }
    return board
}

function createHtmlBoard(board){
    for(var i = 0; i < board.length; i++){
        var tr = document.createElement('tr')
        tr.className = ('row' + i)
        document.getElementById('board').appendChild(tr)
        for(var j = 0; j < board.length; j++){
            var td = document.createElement('td')
            td.innerText = board[i][j]
            td.className = ('col' + j)
            tr.appendChild(td)
        }
    }
}

function solve(user_input, board){

    // We have to clean board in every new search!
    $('#board td').each(function(){
        $(this).css('background', 'none')
        $(this).css('color', 'white')
    })


    var word_lenght = user_input.length
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
            // Check if row has any coincidence
            if(board[i][j] == user_input[0]){
                //Falta fer un try catch per si em passo de llargada
                checkRow(word_lenght, user_input, i, j)
                checkCol(word_lenght, user_input, i, j)
                CheckAxis(word_lenght, user_input, i, j)
            }
        }
    }

    function checkRow(word_length, user_input, i, j){
        // Search word in row
        var row_word = ''
        for(var z = 0; z < word_length; z++){
            if(word_lenght + j > board_size){
                break
            }
            row_word += board[i][j+z]
        }

        // Paint cells
        var count = 0
        var start_position = (board_size*i)+j
        if(row_word == user_input){
            $('#board td').each(function(){
                if(count >= (start_position) && count < (start_position+word_lenght)){
                    $(this).css('background', 'yellow')
                    $(this).css('color', 'black')
                }
                count += 1
            })
        }
    }
    
    function checkCol(word_length, user_input, i, j){
        // Search word in column
        var row_word = ''
        for(var z = 0; z < word_length; z++){
            if(word_lenght + i > board_size){
                break
            }
            row_word += board[i+z][j]
        }

        // Paint cells
        var count = 0
        var start_row = i
        var start_col = j
        var finish_row = i+ word_lenght
        if(row_word == user_input){
            row = 0
            col = 0
            count = 0
            $('#board td').each(function(){
                if(count == board_size){
                    row += 1
                    col = 0
                    count = 0
                }
                if(row >= start_row && col == start_col && row < finish_row){
                    $(this).css('background', 'yellow')
                    $(this).css('color', 'black')
                }
                col += 1
                count += 1
            })
        }
    }

    function CheckAxis(word_length, user_input, i, j){

        // Search word in row
        var row_word = ''
        for(var z = 0; z < word_length; z++){
            if(word_lenght + j > board_size || word_lenght + i > board_size){
                break
            }
            else{
                row_word += board[i+z][j+z]
            }   
        }

        // Check if word matches user input
        var count = 0
        var start_row = i
        var start_col = j
        var finish_row = i + word_lenght
        var finish_col = j + word_lenght
        if(row_word == user_input){
            row = 0
            col = 0
            count = 0
            console.log('existeix en la diagonal')
            $('#board td').each(function(){
                console.log('row: ' + i + ' col: ' + j)
                if(count == board_size){
                    row += 1
                    col = 0
                    count = 0
                }
                if(row >= start_row && col >= start_col && row < finish_row && col < finish_col && row -col == i-j){
                    $(this).css('background', 'yellow')
                    $(this).css('color', 'black')
                }
                col += 1
                count += 1
            })
        }
    }
}