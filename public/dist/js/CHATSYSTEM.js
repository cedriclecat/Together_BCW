/**
 * Created by wouter on 1/18/2016.
 */
document.addEventListener("DOMContentLoaded", function () {
    var QueryString = function () {
        var query_string ={};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();
  //  console.log(QueryString.groupss);
    if(QueryString.groupss === undefined) {}else{
      //  console.log('hh');
        var socket = io.connect();
        socket.on('nick', function (data) {
            document.getElementById("clientshere").value = "";
            data.forEach(function (entry) {
             //   console.log(entry);
                var container = document.createElement('div');
                container.className = "container-fluid";
                container.style.marginTop = "10px";
                container.style.border = "1px solid #d3d3d3";
                container.style.background = "#00acac";
                container.style.paddingLeft = "0px";
                var row = document.createElement('div');
                row.className = "row";
                var col1 = document.createElement('div');
                col1.className = "col-md-2";
                var col2 = document.createElement('div');
                col2.className = "col-md-10";
                var image = document.createElement('img');
                image.src = entry.Foto;
                image.style.height = "50px";
                var h3 = document.createElement("p");
                h3.innerText = entry.naam;
                h3.style.marginTop = "11px";
                var style = document.createElement("style");
                style.type = "text/css";
                var decl = document.createTextNode("p:hover {background-color: #00acac}");
                if (style.stylesheet) {
                    style.styleSheet.cssText = decl.nodeValue;
                } else {
                    style.appendChild(decl);
                }
                h3.appendChild(style);
                var link = document.createElement("a");
                link.href = "./profile?id=" + entry.id;
                link.id = "LINK" + entry.id;
                col1.appendChild(image);
                col2.appendChild(h3);
                row.appendChild(col1);
                row.appendChild(col2);
                container.appendChild(row);
                link.appendChild(container);
                document.getElementById("clientshere").appendChild(link);
            });
        });
        socket.on('deleted', function (data) {
            //console.log(data);
            document.getElementById("LINK" + data).remove();

        });
        socket.on('caty', function (data) {
            var hoofddiv = document.getElementById("clientshere");
            //Wis alle clients
            while(hoofddiv.hasChildNodes()){
                hoofddiv.removeChild(hoofddiv.lastChild);
            }
            //Hervul
            data.forEach(function (entry) {
            //    console.log(entry);
                entry = entry.nick;
                var container = document.createElement('div');
                container.className = "container-fluid";
                container.style.marginTop = "10px";
                container.style.border = "1px solid #d3d3d3";
                container.style.background = "#00acac";
                container.style.paddingLeft = "0px";
                var row = document.createElement('div');
                row.className = "row";
                var col1 = document.createElement('div');
                col1.className = "col-md-2";
                var col2 = document.createElement('div');
                col2.className = "col-md-10";
                var image = document.createElement('img');
                image.src = entry.Foto;
                image.style.margin="5px";
                image.style.height = "50px";
                var h3 = document.createElement("p");
                h3.innerText = entry.naam;
                h3.style.margin="20px 5px 5px 10px";
                h3.style.color="white";
                h3.style.marginTop = "11px";
                var style = document.createElement("style");
                style.type = "text/css";
                var decl = document.createTextNode("p:hover {background-color: #00acac}");
                if (style.stylesheet) {
                    style.styleSheet.cssText = decl.nodeValue;
                } else {
                    style.appendChild(decl);
                }
                h3.appendChild(style);
                var link = document.createElement("a");
                link.href = "./profile?id=" + entry.id;
                link.id = "LINK" + entry.id;
                col1.appendChild(image);
                col2.appendChild(h3);
                row.appendChild(col1);
                row.appendChild(col2);
                container.appendChild(row);
                link.appendChild(container);
                hoofddiv.appendChild(link);
            });
        });
        socket.on('rockgroup', function (entry) {
            var hoofddiv = document.getElementById("chatd");
            //Wis alle clients
            while(hoofddiv.hasChildNodes()){
                hoofddiv.removeChild(hoofddiv.lastChild);
            }
            //Hervul
            //console.log(entry);

            entry.forEach(function (data) {
                var elements = document.getElementsByTagName("header");
              //  console.log(elements[0].id);
                //console.log(data);
                //var msg = data.nick + ': ' + data.message;
                var container = document.createElement('div');
                container.className = "container-fluid";
                container.style.marginTop = "10px";
                container.style.border = "1px solid #d3d3d3";
                container.style.background = "#00acac";
                container.style.paddingLeft = "0px";
                var row = document.createElement('div');
                row.className = "row";
                var col1 = document.createElement('div');
                col1.className = "col-md-2";
                var col2 = document.createElement('div');
                col2.className = "col-md-10";
                var image = document.createElement('img');
                image.src = data.nick.Foto;
                image.style.height = "50px";
                var h3 = document.createElement("p");
                h3.innerText = data.message;
                h3.style.marginTop = "11px";
                var style = document.createElement("style");
                style.type = "text/css";
                var decl = document.createTextNode("p:hover {background-color: #00acac}");
                if (style.stylesheet) {
                    style.styleSheet.cssText = decl.nodeValue;
                } else {
                    style.appendChild(decl);
                }
                h3.appendChild(style);
                var link = document.createElement("a");
                link.href = "./profile?id=" + data.nick.id;
                link.id = "CHAT" + data.nick.id;
                if (elements[0].id == data.nick.id) {
                    h3.style.textAlign = "right";
                    col1.appendChild(image);
                    link.appendChild(col1);
                    col2.appendChild(h3);
                    row.appendChild(col2);
                    row.appendChild(link);
                    container.appendChild(row);
                } else {
                    col1.appendChild(image);
                    link.appendChild(col1);
                    col2.appendChild(h3);
                    row.appendChild(link);
                    row.appendChild(col2);
                    container.appendChild(row);
                }
                hoofddiv.appendChild(container);
            });

        });
        var elements = document.getElementsByTagName("header");
      //  console.log(elements[0].id);
        var zendmij = {};
        zendmij.eerst = elements[0].id;
        zendmij.tweedes = QueryString.groupss;
       // console.log(zendmij);
        socket.emit('nick', zendmij); //this needs to change to your nickname
        document.getElementById("btnchat").addEventListener("click", function () {
            var x = {};
            x.a= QueryString.groupss;
            x.b= document.getElementById("chat-input").value;
           // console.log(x);
            socket.emit('rockgroup',x);
        }, false);
    }
}, false);