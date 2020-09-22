window.onload = start = () => {



    $('#board').click(function(event) {
        
        if($(event.target).css('background-color') == 'rgb(0, 0, 0)'){
            $(event.target).css('background-color', '')
        }
        else{
            $(event.target).css('background-color', 'black')
        }
    });

    $('#solve-btn').click(function(event){
        var word = ($('.input input').val())
        solve(word) 
    })
}

function solve(word){
    $('#board td').each(function(){
        for(var i = 0; i < word.length; i++){
            if(word[i] === $(this).text()){
                $(this).css('background', 'black') //Executar canvi CSS
                new_word = ''
                console.log(new_word)
                for(i = word.length - (word.length-1); i = word.length; i++){
                    new_word.concat(word[i])
                }
                if(word.length == 0){
                    break
                }
                else{
                    solve(new_word)
                }
            }
            else{
                break
            }
        }
    })
}