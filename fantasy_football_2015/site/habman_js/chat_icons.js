  function parseChatXML (chatXML) {
   var messages = chatXML.getElementsByTagName("message");
   var displayContent = '';
   
   var chat_table = document.getElementById("league_chat");
   var table_body;
   if (chat_table) {
      table_body = chat_table.getElementsByTagName("TBODY");
   } else {
      table_body = document.getElementsByTagName("TBODY");
   }

   var do_clear = false;
   var action = chatXML.getElementsByTagName("messages")[0].getAttribute("action");
   if (action && action == "clear") {
      do_clear = true;
   }

   var body_rows = table_body[0].getElementsByTagName("TR");
   var second_row = body_rows[1];
   var newMessage = 0;

   // todo - compare each message's "to" value to the current franchise_id - if it exists, and it's the same
   // display it, otherwise, don't
   if (! do_clear) {
      var messagesDisplayed = 0;
      for (var i = 0; i < messages.length; i++) {
         if (messagesDisplayed > displayMessages) {
            break;
         }
         var id = messages[i].getAttribute("id");
         if (! document.getElementById(id)) {
            var this_fid = messages[i].getAttribute("franchise_id");
            var to_fid = messages[i].getAttribute("to");
            if (to_fid != null) {
               // don't display it to folks who haven't logged in.
               if (typeof franchise_id == "undefined") {
                  // displayMessages++;
                  continue;
               }
               // don't display it unless i'm the sender or receiver!
               if (to_fid != franchise_id && this_fid != franchise_id) {
                  // displayMessages++;
                  continue;
               }
            }
            var message = messages[i].getAttribute("message");
            var posted = messages[i].getAttribute("posted");
            var new_row = document.createElement("TR");
            new_row.setAttribute("id", id);
            new_row.setAttribute("title", "Posted: " + posted);
            var make_it_bold = false;
            if (to_fid != null) {
               make_it_bold = true;
            }
            var by_cell = document.createElement("TD");
			var fdb = franchiseDatabase['fid_'+this_fid];
            
			if(this_fid=='0000')
			{
				displayContent =  jQuery('#commishIconDIV').html().trim();
			}
			else
			{
				if(fdb.icon!='') 
				{
					displayContent	= '<img src="' + fdb.icon + '"class="franchiseicon" title="' + fdb.name + '" />';
				}
			      else
			       {
					displayContent = fdb.name;         
				}
			}
			displayContent	= '<a href="' + window.baseURLDynamic + '/' + window.year + '/options?L=' + window.league_id + '&F=' + fdb.id + '&O=01">' + displayContent+'</a>'

			by_cell.innerHTML = (make_it_bold ? "<b>" : "") + displayContent + (make_it_bold ? "</b>" : "");
		
            new_row.appendChild(by_cell);
            var message_cell = document.createElement("TD");
            message_cell.innerHTML = (make_it_bold ? "<b>" : "") + message + (make_it_bold ? "</b>" : "");
            new_row.appendChild(message_cell);
            table_body[0].insertBefore(new_row, second_row);
            if (typeof franchise_id != "undefined" && this_fid != franchise_id) {
               newMessage++;
            }
         }
         messagesDisplayed++;
      }

      body_rows = table_body[0].getElementsByTagName("TR");
      for (var i = body_rows.length; i > displayMessages + 1; i--) {
         if (body_rows[i] && body_rows[i].getAttribute("id")) {
            table_body[0].deleteRow(i);
         }
      }


      body_rows = table_body[0].getElementsByTagName("TR");
      for (var i = 1; i < body_rows.length; i++) {
         if (body_rows[i] && body_rows[i].getAttribute("id") && body_rows[i].getAttribute("id") == "loadingchatdata") {
            table_body[0].deleteRow(i);
         }
      }
   } else {
      while (body_rows.length > 2) {
         table_body[0].deleteRow(1);
         body_rows = table_body[0].getElementsByTagName("TR");
      }
   }

   body_rows = table_body[0].getElementsByTagName("TR");
   for (var i = 1; i < body_rows.length; i++) {
      var this_class = "eventablerow";
      if (i % 2 == 1) {
         this_class = "oddtablerow";
      }
      body_rows[i].setAttribute("className", this_class);
      body_rows[i].setAttribute("class", this_class);
   }
   messages = null;
   if (newMessage == 1) {
      play_audio_clip("ohoh", "chat_audio_clip");
      // only do this if it's not the initial page load time!
      if (! document.getElementById("body_home")) {
         setTimeout("document.chat.chat.focus()", 100);
      }
   }
}