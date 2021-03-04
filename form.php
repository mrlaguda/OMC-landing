<?php

$_SESSION['enquiry'] = json_encode($_POST);

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://enquiries.colliers.co.nz/enquiry',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLINFO_HEADER_OUT => true,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_HEADER => 1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $_SESSION['enquiry'],
    CURLOPT_HTTPHEADER => array(
        'CLIENT_ID: A4918D71-B474-EB11-812B-005056AB24D2',
        'API_KEY: ND$+3SwbeLR$zDV2@eSF*nBk4V*5eqPH^6dXPweg4Z78',
        'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);

if (curl_errno($curl)) {
    die('Couldn\'t send request: ' . curl_error($curl));
} else {
    $resultStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if ($resultStatus == 200) {
    } else {
        die('Request failed: HTTP status code: ' . $resultStatus);
    }
}

echo $response;
curl_close($curl);