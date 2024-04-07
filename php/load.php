#!/usr/bin/php-cgi
<?php
    // Iniciem la sessió
    session_start();

    // Connexió a la base de dades (heu de substituir les credencials)
    $conn = oci_connect('u1988480', 'tphqjcvm', 'ORCLCDB');

    // Preparem la comanda SQL per a seleccionar les dades de la partida
    $select = "SELECT pairs, points, cards FROM memory_save WHERE uuid = :uuid";
    $comanda = oci_parse($conn, $select);

    // Assignem el valor del UUID als paràmetres de la comanda
    oci_bind_by_name($comanda, ":uuid", $_POST['uuid']);

    // Executem la comanda SQL
    oci_execute($comanda);

    // Obtenim les dades de la partida
    oci_fetch($comanda);
    $pairs = oci_result($comanda, "PAIRS");
    $points = oci_result($comanda, "POINTS");
    $cards = oci_result($comanda, "CARDS");

    // Tanquem la connexió amb la base de dades
    oci_close($conn);

    // Retornem les dades de la partida en format JSON
    echo json_encode(array("pairs" => $pairs, "points" => $points, "cards" => json_decode($cards)));
?>
