$(document).ready(inicialize);

function inicialize() {

    $("#login").click(function () {
        Login();
    });

    //$("#loginIdat #loginForm #tableloginPartial input#loginUser.button").click(function (event) {
    //    alert(event);
    //    event.preventDefault();
    //    validaLogin();
    //});

    $("#logoff").click(function () {
        Logoff();
    });

    menuParcial();

  
  
    
}

function CerrarSession() {
    var url = getPath() + "Account/cerrarSesion";

    $('.modal-dialog').css('max-width', '600px');
    $('.modal-dialog').css('width', '600px');
    $("#divModal").modal("show");
    $("#divModal #modalHeader h4").text("Cerrar sesión");
    $("#divModal #modalBody").empty().html('<p style="text-align: center;">¿Estás seguro de que deseas cerrar sesión?</p>');                
    $("#divModal #modalFooter").show();
    $("#divModal #modalFooter").html(
          '<a href="'+url+'" class="btn btn-default">Aceptar</a><button id="modalCerrar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'
     );
}

function goHome(tnCodUni)
{
    window.location.replace(getPath() + "Home/Index?tnCodUni=" + tnCodUni);
}

function menuParcial(i)
{
    $('#MenuParcial').load(getPath() + "Paginas/Index?tcPath="+getPath());
}

function cargaPanel(id,url)
{
    //$('#verCriterio').fadeOut('slow', function () {
    //    $('#verCriterio').load("/Criterio/verCriterio?tnCodCri=" + tnCodCri, function () {
    //        $('#verCriterio').fadeIn('slow');
    //    });
    //});

    //$.ajax({
    //    type: 'POST',
    //    url: url,
    //    contentType: 'application/json; charset=utf-8',
    //    data: JSON.stringify({ nPagPad: id }),
    //    dataType: 'html',
    //    success: function (data) {
    //        $('#DatosPersonales').fadeOut('slow', function () { $('#Notificaciones').fadeOut('slow') });

    //        $("#indexBody").html(data);
    //        event.preventDefault();
            
    //    },
    //    error: function (data) {
    //        alert("Ocurrio un error al cargar la opción indicada!");
    //    }
    //});
}

function validaLogin(event)
{
    if (($("#tcActDir").val() == "") || ($("#tcActPas").val() == "") || $("#tcCaptcha").val() == "")
    {
        $("#Error").html("<label id='lblError' class='text-danger'>Complete todos los campos obligatorios</label>");
        event.preventDefault();        
    } else {
    

        //cambio-26122019
        // comentar para probar si catcha
        if (typeof (grecaptcha) != 'undefined') {
            var response = grecaptcha.getResponse();
            if (response.length === 0) {
                $("#Error").empty().html("<label id='lblError' class='text-danger'>Seleccione la casilla de verificación</label>");
                event.preventDefault();
            }
        } else {
            //cambio-26122019
            if (ReCaptchaGoogleValido() == false) {
                $("#Error").empty().html("<label id='lblError'  class='text-danger'>Ocurrió un error. Vuelva a intentarlo por favor</label>");
                event.preventDefault();
                //$("#Error").empty().html("<label id='lblError'  class='text-danger'>El texto que introdujo no corresponde al de la imagen. Por favor intente nuevamente</label>");
                //event.preventDefault();
                //generaCaptcha();
                //$("#cCaptcha").val("");
            }
        }
    }

}
//cambio-26122019
function ReCaptchaGoogleValido() {
    var valida = false;
    $.ajax({
        type: 'POST',
        url: getPath() + 'Account/IsReCaptchValid',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function (data) {
            valida = data;
        },
        error: function (data) {
            $("#Error").html("<label id='lblError'  class='text-danger'>Ocurrio al validar el captcha</label>");
        }
    });

    return valida;
}
function Login() {
    
    crearDialog("Iniciar Sesión", "100px");
    $('#dialog').load(getPath() + "Account/LoginPartial");

}

function Logoff() {

    $("#dialogCerrar").html("¿Estás seguro de que deseas cerrar sesión?");

    $("#dialogCerrar").css({ 'text-align': 'center' });

    $("#dialogCerrar").dialog({
        resizable: false,
        height: 'auto',
        width: '350px',
        'text-align': 'center',
        closeText: "hide",
        modal: true,
        buttons: {
            "Aceptar": function () {
                AceptaCerrar();
                $(this).dialog("close");
                $("div[aria-describedby=dialogCerrar]").replaceWith("");
                $("#dialogCerrar").html("");
            },
            "Cancelar": function () {
                $(this).dialog("close");
                $("div[aria-describedby=dialogCerrar]").replaceWith("");
                $("#dialogCerrar").html("");
            }
        }
    });
   
   
    
    $("div[aria-describedby=dialogCerrar] .ui-dialog-titlebar-close").addClass("glyphicon glyphicon-remove");
    $("div[aria-describedby=dialogCerrar] .ui-dialog-buttonset").css({ 'text-align': 'center' });
    $("div[aria-describedby=dialogCerrar] .ui-dialog-buttonset").css({ 'float': 'none' });
    $("div[aria-describedby=dialogCerrar] .ui-dialog-buttonset").css({ 'visibility': 'visible' });
    $("div[aria-describedby=dialogCerrar]").css({ 'z-index': '9999' });
}

function AceptaCerrar()
{
        window.location.replace(getPath() + "Account/cerrarSesion/");
   
}

function AbrirMensaje() {
    $("#VentanaModal").modal();
    $("#panelmensajes").empty().load(getPath() + "Notificacions/NotificacionesDocente");
}

function crearDialog(title,width) {

    $("#dialog").dialog({
        //show: {
        //    effect: "fade",
        //    duration: 1000
        //},

        hide: {
            effect: "fade",
            duration: 1000
        },

        title: title,
        closeOnEscape: false

    }).removeAttr("style");

    $(".ui-dialog").removeAttr("style").css({ "width": width});
    $(".ui-dialog-titlebar-close ").addClass("glyphicon glyphicon-remove");
    $(".ui-dialog-buttonpane").css({ 'visibility': 'hidden' });

}

//function validaCaptcha(cCaptcha)
//{

//    var cActDir = $("#tcActDir").val();
//    var tcUnidad = $("#TnUni").val();
    
//    var valida = false;
//    $.ajax({
//        type: 'POST',
//        url: getPath() + 'Account/validaCaptcha',
//        contentType: 'application/json; charset=utf-8',
//        data: JSON.stringify({ tcCaptcha: cCaptcha, tcActDir: cActDir, cUni: tcUnidad }),
//        dataType: 'json',
//        async: false,
//        success: function (data) {
//            valida = data;
//        },
//        error: function (data) {
//            $("#Error").html("<label id='lblError'  class='text-danger'>Ocurrio al validar el captcha</label>");
//        }
//    });
    
//    return valida;
//}

function validaCaptcha(cCaptcha) {
    var valida = false;
    $.ajax({
        type: 'POST',
        url: getPath() + 'Account/validaCaptcha',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ tcCaptcha: cCaptcha }),
        dataType: 'json',
        async: false,
        success: function (data) {
            valida = data;
        },
        error: function (data) {
            $("#Error").html("<label id='lblError'  class='text-danger'>Ocurrio al validar el captcha</label>");
        }
    });

    return valida;
}


function generaCaptcha()
{    
    $.ajax({
        type: 'POST',
        url: getPath() + 'Account/CaptchaImage',
        contentType: 'application/json; charset=utf-8',
        dataType: 'html',
        success: function (data) {
            //$("#dCaptcha").html('<img src="data:image/Jpeg;base64,' + data + '" />');
            $("#dCaptcha").attr('src',  'data:image/Jpeg;base64,'+data );
        },
        error: function (data) {
            $("#Error").html("<label id='lblError'  class='text-danger'>Ocurrio al validar el captcha</label>");
        }
    });
}

function getPath()
{
    var pathInfo = window.location.pathname;

    var uri = pathInfo.split("/");

    //var URL = '/' + uri[1] + '/'; //Desarrollo
    var URL = '/'; //Producción

    //alert("1 " + uri[0] + " 2 " + uri[1])

    return URL;
}


function validateSession(b, num, g, r) {
    console.log(b)
    console.log(num)
    console.log(g)

    if (b) {
        if (b.jqXHR) {

            if (b.jqXHR.readyState === 4) {
                $("#divModal").modal("show");
                $("#divModal #modalBody").empty().html("<p><br />Ha excedido el tiempo de sesion permitido para esta p&aacute;gina.</p>");
                $("#divModal #modalHeader h4").text('Tiempo de Espera Agotado');
                $("#divModal #modalFooter").empty().show().html(
                    '<a id="modalCerrarsesion12" type="button" class="btn btn-default" >Aceptar</button>'
                );

                $('#modalFooter #modalCerrarsesion12').click(function () {
                    window.open(getPath() + "Home/UTP", "_blank");
                    $("#divModal").modal("hide");
                })
            }
        }
    }


}

function validarSessionbtn(b) {
    console.log(b)
    if (b.readyState === 4) {
        $("#divModal").modal("show");
        $("#divModal #modalBody").empty().html("<p><br />Ha excedido el tiempo de sesion permitido para esta p&aacute;gina.</p>");
        $("#divModal #modalHeader h4").text('Tiempo de Espera Agotado');
        $("#divModal #modalFooter").empty().show().html(
            '<a id="modalCerrarsesion12" type="button" class="btn btn-default" >Aceptar</button>'
        );

        $('#modalFooter #modalCerrarsesion12').click(function () {
            window.open(getPath() + "Home/UTP", "_blank");
            $("#divModal").modal("hide");
        })
    }
}