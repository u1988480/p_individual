#!/usr/bin/php-cgi
<?php
    // Iniciem la sessió
    session_start();

    // Decodifiquem les dades rebudes
    $_POST = json_decode(file_get_contents('php://input'), true);

    // Assignem les dades rebudes a variables
    $uuid = $_POST['uuid'];
    $pairs = $_POST['pairs'];
    $points = $_POST['points'];
    $cards = json_encode($_POST['cards']);

    // Connexió a la base de dades (heu de substituir les credencials)
    $conn = oci_connect('u1988480', 'tphqjcvm', 'ORCLCDB');

    // Preparem la comanda SQL per a la inserció
    $insert = "INSERT INTO memory_save (uuid, pairs, points, cards) VALUES (:uuid, :pairs, :points, :cards)";
    $comanda = oci_parse($conn, $insert);

    // Assignem els valors als paràmetres de la comanda
    oci_bind_by_name($comanda, ":uuid", $uuid);
    oci_bind_by_name($comanda, ":pairs", $pairs);
    oci_bind_by_name($comanda, ":points", $points);
    oci_bind_by_name($comanda, ":cards", $cards);

    // Executem la comanda SQL
    oci_execute($comanda);

    // Tanquem la connexió amb la base de dades
    oci_close($conn);

    // Retornem una resposta indicant que s'ha guardat la partida
    echo json_encode(true);
?>
