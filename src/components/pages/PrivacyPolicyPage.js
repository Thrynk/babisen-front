import React from "react";

import { Typography } from '@material-ui/core';

import "./PrivacyPolicy.css";

export default function PrivacyPolicyPage(){
    return (
        <div className="content">
            <Typography component="h1">
                Politique de confidentialité :
            </Typography>

            <Typography component="p">
                Vos données sont sauvegardés dans un fichier informatisé par Bab'isen dont le délégué à la protection des données est CARIN Thomas,
                41 boulevard Vauban 59000 Lille (siège de Bab'isen), 06 28 59 55 86, thomas.carin@isen.yncrea.fr
                pour permettre de vous identifier lors de l'inscription à un tournoi. Le traitement est effectué sur la base des intérêts légitimes
                de l'association dans la mesure où nous avons besoin d'associer la personne inscrite pour afficher ses scores lors d'un tournoi.
            </Typography>

            <Typography component="p">
                Les données récoltées sont les suivantes : nom, prénom, url de la photo de profil venant de Facebook.
            </Typography>

            <Typography component="p">
                Les renseignements rassemblés ne seront pas communiquées à des tiers.
            </Typography>

            <Typography component="p">
                Vos données seront conservés durant un temps indeterminé jusqu'à ce que vous demandiez de les faire.
            </Typography>

            <Typography component="div">
                Vous garderez un droit de regard sur vos informations.
                Vous pouvez y accéder, les rectifier, demander leur modification et suppression et exercer votre droit à la limitation du traitement.
                Vous pourrez exercer ces droits à tout moment. Pour cela, vous pourriez contacter le délégué à la protection des données :
                <ul>
                    <li>Par mail : thomas.carin@isen.yncrea.fr</li>
                    <li>Par courrier postal à l'adresse : 41 boulevard Vauban 59000 Lille, au nom de Bab'isen</li>
                </ul>
            </Typography>

            <Typography component="p">
                Aussi, vous pouvez retirer votre consentement au traitement de vos données à tout moment ou vous opposer au traitement de vos données.
                Vous pouvez également exercer un droit à la portabilité sur vos données personnelles.
            </Typography>

            <Typography component="p">
                Si après avoir contacté notre service juridique, vous constatez que vos droits « Informatiques et Libertés » ne sont pas respectés,
                vous pourrez adresser une réclamation à la Commission nationale de l’Informatique et des Libertés ou CNIL, 3 Places de Fontenoy, 75007 Paris.
            </Typography>

        </div>
    );
}
