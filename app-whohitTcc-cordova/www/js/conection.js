var App = {
	db: null,
	initialize:function(){
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},
	//Metodo handler
	onDeviceReady:function() {
	    this.createDatabase();
        document.getElementById('btnEntrar').addEventListener('click', App.newLogin);
		document.getElementById('btn-salvaAltera').addEventListener('click', App.updateValues);
        document.getElementById('proximo').addEventListener('click', App.insertValues);
        document.getElementById('btn-sair').addEventListener('click',App.logout);
		
		FCMPlugin.subscribeToTopic('tstWhohit')
    }
	,

    createDatabase: function(){
	    App.db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
        this.db.transaction(function(tx){
			
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf unique,cep,endereco,bairro,cidade,estado)');
           // tx.executeSql('CREATE TABLE IF NOT EXISTS raspIP(ip)');
        });
    },
    newLogin:function(){
        App.db.transaction(function (tx){
            var ssql = "select * from usuario where email = '" + document.getElementById('loginUser').value + "' AND senha = '"+ document.getElementById('loginSenha').value +"'";
            tx.executeSql(ssql, [], function (tx, result) {
                if(result.rows.length) {
					console.log(result);
                    document.getElementById('txtNome').value = result.rows[0].nome;
                    document.getElementById('txtEmail').value = result.rows[0].email;
                    document.getElementById('txtCep').value = result.rows[0].cep;
                    document.getElementById('txtEndereco').value = result.rows[0].endereco;
                    document.getElementById('txtBairro').value = result.rows[0].bairro;
                    document.getElementById('txtCidade').value = result.rows[0].cidade;
                    document.getElementById('txtEstado').value = result.rows[0].estado;
                    console.log(result);
                    $.mobile.changePage("#pageHome");
                }
                else{
                    alert("Login ou senha invalidos!!");
                }
            });
        });
    },
	insertValues:function() {
		if(App.emailTeste(document.getElementById('email').value)  == false){
			alert("Preenchimento de email Invalido ");
		}
		else if(document.getElementById('senha').value  == ""){
			alert("Preenchimento de senha vazio");
		}
		else if(document.getElementById('nome').value  == ""){
			alert("Preenchimento de nome vazio");
		}
		else if(document.getElementById('data_nascimento').value  == ""){
			alert("Preenchimento de data de nascimento vazio");
		}
		else if(App.cpfTeste(document.getElementById('cpf').value)  == ""){
			alert("Preenchimento de cpf inválido");
		}
		else if(document.getElementById('cep').value  == ""){
			alert("Preenchimento de cep vazio");
		}
		else if(document.getElementById('endereco').value  == ""){
			alert("Preenchimento de endereço vazio");
		}
		else if(document.getElementById('bairro').value  == ""){
			alert("Preenchimento de bairro vazio");
		}
		else if(document.getElementById('cidade').value  == ""){
			alert("Preenchimento de cidade vazio");
		}
		else if(document.getElementById('estado').value  == ""){
			alert("Preenchimento de estado vazio");
		}
		else
		{
			var addDados = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,cep,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
				'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('cep').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value +
				'","' + document.getElementById('estado').value + '")';
			App.db.transaction(function (tx){
				tx.executeSql(addDados);
				tx.executeSql("select * from usuario where cpf = '" + document.getElementById('cpf').value + "'", [], function (tx, result) {
					document.getElementById('txtNome').value = result.rows[0].nome;
					document.getElementById('txtEmail').value = result.rows[0].email;
					document.getElementById('txtCep').value = result.rows[0].cep;
					document.getElementById('txtEndereco').value = result.rows[0].endereco;
					document.getElementById('txtBairro').value = result.rows[0].bairro;
					document.getElementById('txtCidade').value = result.rows[0].cidade;
					document.getElementById('txtEstado').value = result.rows[0].estado;
					console.log(result);
				});
			//var addIP = 'INSERT INTO raspIP(ip) VALUES("' + document.getElementById('ip').value +'")';	
				//	tx.executeSql(addIP);
				//	tx.executeSql("select * from raspIP where ip = '" + document.getElementById('ip').value + "'", [], function(tx,result){
					//document.getElementById('valor').value = result.rows[0].ip;
				//	console.log(result);
				//});
				//$.mobile.changePage("#pageHome");
			//});
			$.mobile.changePage("#pageHome");
		});
		}
    },
	
	emailTeste:function(email){		  	
		usuario = email.substring(0, email.indexOf("@"));
		dominio = email.substring(email.indexOf("@") + 1, email.length);
		if ((usuario.length >= 1) &&
			(dominio.length >= 3) &&
			(usuario.search("@") == -1) &&
			(dominio.search("@") == -1) &&
			(usuario.search(" ") == -1) &&
			(dominio.search(" ") == -1) &&
			(dominio.search(".") != -1) &&
			(dominio.indexOf(".") >= 1) &&
			(dominio.lastIndexOf(".") < dominio.length - 1)) 
		{
			return true;
		}
		else {
			return false;
		}
	},
	
	updateValues:function(){
		App.db.transaction(function (tx){
			var nome, email,cep,endereco, bairro, cidade, estado;
			//var update = "UPDATE usuario set nome = ?, email = ?,endereco = ?,bairro = ?,cidade = ?,estado = ?";
			//tx.executeSql(update,[document.getElementById('nome').value,document.getElementById('email').value,document.getElementById('endereco').value,document.getElementById('bairro').value,document.getElementById('cidade').value,document.getElementById('estado').value]);
			tx.executeSql("select * from usuario where email = '"+document.getElementById('loginUser').value+"'", [], function(tx, result){
				var teste;
				nome = result.rows[0].nome;
				email = result.rows[0].email;
				cep = result.rows[0].cep;
				endereco = result.rows[0].endereco;
				bairro =  result.rows[0].bairro;
				cidade =  result.rows[0].cidade;
				estado = result.rows[0].estado;	
				if(document.getElementById('txtNome').value!=""){
					nome = document.getElementById('txtNome').value;
				}
				if(document.getElementById('email').value!=""){
					email = document.getElementById('txtEmail').value;					
				}
				if(document.getElementById('txtCep').value!=""){
					endereco = document.getElementById('txtCep').value;					
				}
				if(document.getElementById('txtEndereco').value!=""){
					endereco = document.getElementById('txtEndereco').value;					
				}
				if(document.getElementById('txtBairro').value!=""){
					bairro = document.getElementById('txtBairro').value;					
				}
				if(document.getElementById('txtCidade').value!=""){
					cidade = document.getElementById('txtCidade').value;					
				}
				if(document.getElementById('txtEstado').value!=""){
					estado = document.getElementById('txtEstado').value;					
				}
				var uup = "update usuario set nome = '"+nome+"', email = '"+email+"',cep = '"+cep+"', endereco = '"+endereco+"', bairro = '"+bairro+"', cidade = '"+cidade+"', estado = '"+estado+"' where email = '"+document.getElementById('loginUser').value+"'";
				tx.executeSql(uup);
				document.getElementById('txtNome').value = nome;
				document.getElementById('txtEmail').value = email;
				document.getElementById('txtCep').value = email;
				document.getElementById('txtEndereco').value = endereco;
				document.getElementById('txtBairro').value = bairro;
				document.getElementById('txtCidade').value = cidade;
				document.getElementById('txtEstado').value = estado;

				alert('Dados salvos com sucessso!!');
			});
		});
	},
cpfTeste:function(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;
    // Valida 1o digito
    add = 0;
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
        return false;
    return true;
},
}
App.initialize();