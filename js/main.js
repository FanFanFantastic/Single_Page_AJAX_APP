//All Credits belong to Jiongming Fan
$(function() {
    
    //Global Variable Declaration
    var $users = $('#users');
    var $posts = $('#posts');
    var $submit_new = $('#submit_new');
    var $submit_edit = $('#submit_edit');
    var $new_title = $('#new_title');
    var $new_body = $('#new_body');
    var $edit_title = $('#edit_title');
    var $edit_body = $('#edit_body');
    var $lock = false;
    
    
    //AJAX call to display records
    $.ajax({
        url: 'http://jsonplaceholder.typicode.com/users',
        type: 'GET',
        dataType: 'json',
        success: displayAll
    });

    function displayAll(data){
        
        $.each(data, function(i,user){    
        $users.append('<tr> <td>'+user.id+'</td><td>'+user.name+'</td> <td>'+user.address.street+' '+user.address.city+' '+user.address.suite+', ZipCode: '+user.address.zipcode+'</td>'+"<td><button id='"+user.id+"'>Show Posts</button></td></tr>");
        
            
        $('#'+user.id).click(function(){
            //AJax USer POST calls to show 
            //SPA function
            $('#user_info').fadeOut(500).css("display", "none");
            $('#user_post').fadeIn(500).css("display", "inline-block");
            $('#home').fadeIn(500).css("display", "inline-block");
            $('#add_post').fadeIn(500).css("display", "inline-block");
            if(!$lock)
            {
            $.ajax({
                        url: 'http://jsonplaceholder.typicode.com/posts?userId='+user.id,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data) {
                                            $.each(data, function(j,post){
                                                                            
                                                        $posts.append('<tr> <td>'+post.id+'</td><td>'+post.title+'</td> <td>'+post.body+'</td>'+"<td><button id='delete"+post.id+"' class='btn-danger'>Delete</button><button id='edit"+post.id+"'>Edit</button></td></tr>");
                                                        
                            
                                                        //DELETE
                                                        $('#delete'+post.id).click(function(){
                                                                
                                                            var $row =$(this).closest('tr');
                                                            alert("One Entry Deleted!");
                                                            $.ajax({
                                                                        url: 'http://jsonplaceholder.typicode.com/posts/'+post.id,
                                                                        type: 'DELETE',
                                                                        success: function(data) {
                                                                            $row.remove();
                                                                                                } });
                                                                
                                                        
                                                        } );
                                                            
                                                
                                                        //EDIT AJAX
                                                        $('#edit'+post.id).click(function(){
                                                            var $row =$(this).closest('tr');
                                                            $('#user_post').fadeOut(500).css("display", "none");
                                                            $('#home').fadeIn(500).css("display", "none");
                                                            $('#add_post').fadeIn(500).css("display", "none");
                                                            $('#new').fadeOut(500).css("display", "none");
                                                            $('#edit').fadeIn(500).css("display", "inline-block");
                                                            
                                                            $($submit_edit).click(function(){   
                                                             var patch = {
                                                                                userId: data.userId,
                                                                                id: data.id,
                                                                                title: $edit_title.val(),
                                                                                body: $edit_body.val()
                                                                        };
                                                            
                                                            
                                                            
                                                            
                                                            $.ajax({
                                                                        url: 'http://jsonplaceholder.typicode.com/posts/'+post.userId,
                                                                        type: 'PUT',
                                                                        success: function(newPost) {
                                                                            alert("Updated Row At!"+post.id);
                                                                            $row.after('<tr> <td>'+(post.id)+'</td><td>'+$edit_title.val()+'</td> <td>'+$edit_body.val()+'</td>'+"<td><button id='delete"+post.id+"' class='btn-danger'>Delete</button><button id='edit"+post.id+"'>Edit</button></td></tr>");
                                                                            $row.remove();
                                                                            
                                                                            $('#user_post').fadeIn(500).css("display", "inline-block");
                                                                            $('#home').fadeIn(500).css("display", "inline-block");
                                                                            $('#add_post').fadeIn(500).css("display", "inline-block");
                                                                            $('#new').fadeOut(500).css("display", "none");
                                                                            $('#edit').fadeOut(500).css("display", "none");
                                                                                                } });
                                                                
                                                        
                                                        } );
                                                        });
                                                
                                                        
                                                
                                                        });//END OF EACH
                            
                                                        
                                                            //ADD NEW POST
                                                            $submit_new.click( function(post)
                                                            {
                                                                var entry = {
                                                                                userId: post.userId,
                                                                                id: post.id,
                                                                                title: $new_title.val(),
                                                                                body: $new_body.val()
                                                                        };

                                                                //POST AJAX call

                                                                $.ajax({
                                                                            url: 'http://jsonplaceholder.typicode.com/posts',
                                                                            type: 'POST',
                                                                            data:  entry,
                                                                            success: function(newPost)
                                                                            {
                                                                                
                                                                                $posts.append('<tr> <td>'+(newPost.id)+'</td><td>'+newPost.title+'</td> <td>'+newPost.body+'</td>'+"<td><button id='delete"+post.id+"' class='btn-danger'>Delete</button><button id='edit"+post.id+"'>Edit</button></td></tr>");
                                                                                $('#user_post').fadeIn(500).css("display", "inline-block");
                                                                                
                                                                                $('#user_post').fadeIn(500).css("display", "inline-block");
                                                                                $('#home').fadeIn(500).css("display", "inline-block");
                                                                                $('#add_post').fadeIn(500).css("display", "inline-block");
                                                                                $('#new').fadeOut(500).css("display", "none");
                                                                        
                                                                            },
                                                                            error: function(){ alert("JSON POST ERROR");}


                                                                    });
                                                                    
                                                                $lock = true;

                                                            } //END OF SUBMIT_NEW


                                                            );
                            
                                                //DELETE/EDIT POST
                            
                                            
                                          
                  
                        }

            });
                
            }//END LOCK
            
        });
    });
    
    }
    
    
    var $back_home = $('#home');
    
    $back_home.click( function()
    {
            $('#user_info').fadeIn(500).css("display", "inline-block");
            $('#user_post').fadeOut(500).css("display", "none");
            $('#home').fadeOut(500).css("display", "none");
            $('#add_post').fadeOut(500).css("display", "none");
            $lock = true;
    }
    
    );
    
    
    var $add_post = $('#add_post');
    var $new = $('#new');
    
    $add_post.click( function()
    {
            $('#user_post').fadeOut(500).css("display", "none");
            $('#home').fadeOut(500).css("display", "none");
            $('#add_post').fadeOut(500).css("display", "none");
            $('#new').fadeIn(500).css("display", "inline-block");
            
    });
           
    
    //SORTING
    var $sortButton = $('#sort');
    
    
    $sortButton.click(function(){
            alert("WTF");
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc){rows = rows.reverse()}
            for (var i = 0; i < rows.length; i++){table.append(rows[i])}
        })
        function comparer(index) {
            return function(a, b) {
                var valA = getCellValue(a, index), valB = getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
            }
        }
        function getCellValue(row, index){ return $(row).children('td').eq(index).html() }
    
    
    
});




