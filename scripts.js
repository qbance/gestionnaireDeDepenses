const bouton = document.getElementById('btnCalculer');
const input = document.getElementById('masaisiedesalaire');
const affichageDepenses = document.getElementById('resultatsDepense');
const affichagePlaisirs = document.getElementById('resultatsPlaisir');
const affichageEpargne = document.getElementById('resultatsEpargne');
const reelDepenses = document.getElementById('reelDepense');
const reelPlaisirs = document.getElementById('reelPlaisir');
const reelEpargne = document.getElementById('reelEpargne');
const boutonComparer = document.getElementById('btnComparer');
const messageAlerte = document.getElementById('messageAlerte');

bouton.addEventListener('click', function(){
    const salaire = parseFloat(input.value);

    if (salaire>0){

        affichageDepenses.textContent = (salaire*0.5).toFixed(2);
        affichagePlaisirs.textContent = (salaire*0.3).toFixed(2);
        affichageEpargne.textContent = (salaire*0.2).toFixed(2)

    }else{
        alert("Veuillez entrer un montant valide supérieur à 0");
    }

});

boutonComparer.addEventListener('click', function(){

    if (parseFloat(affichageDepenses.textContent) === 0) {
        messageAlerte.textContent = "Veuillez d'abord calculer votre budget cible.";
        messageAlerte.style.color = "orange";
        return;
    }

    const cibleDepense = parseFloat(affichageDepenses.textContent);
    const ciblePlaisir = parseFloat(affichagePlaisirs.textContent);
    const cibleEpargne = parseFloat(affichageEpargne.textContent);
    

    const valReelDep = parseFloat(reelDepenses.value);
    const valReelPlai = parseFloat(reelPlaisirs.value);
    const valReelEpa = parseFloat(reelEpargne.value);

if (isNaN(valReelDep) || isNaN(valReelPlai) || isNaN(valReelEpa)) {
        messageAlerte.textContent = "Erreur : Veuillez remplir tous les champs !";
        messageAlerte.style.color = "red";
        return; 
    }
    let alerte=[];

    if (valReelDep>cibleDepense) alerte.push("Attention : Dépenses fixes trop élevées !");
    if (valReelPlai>ciblePlaisir) alerte.push("Attention: Dépenses plaisirs trop élevées !");
    if (valReelEpa<cibleEpargne) alerte .push("Attention : Epargne insufisante !");

    if (alerte.length === 0) {

    const container = document.getElementById('suggestionContainer');

    container.style.display = "block";

    messageAlerte.textContent = "Bravo, vous respectez le budget !";
    messageAlerte.style.color = "#7FDD4C";

    document.getElementById('texteSuggestion').textContent = "";
    document.getElementById('btnSwitch').style.display = "none";

} else {
   const container = document.getElementById('suggestionContainer');
    const texte = document.getElementById('texteSuggestion');

    container.style.display = "block";

    messageAlerte.textContent = alerte.join("\n");
    messageAlerte.style.color = "#FF0921";

    const btnSwitch = document.getElementById('btnSwitch');

if (
    document.querySelector('.box:nth-child(1) h3').textContent.includes("70%")
) {
    texte.textContent =
    "Même avec le modèle 70/20/10, votre budget est dépassé.";

    btnSwitch.style.display = "none";
} else {
    texte.textContent =
    "Votre budget semble serré pour le modèle 50/30/20. Souhaitez-vous essayer le modèle 70/20/10 ?";

    btnSwitch.style.display = "inline-block";
}
    document.getElementById('btnSwitch').style.display = "inline-block";
}
});
// Dans scripts.js, modifiez l'écouteur du bouton btnSwitch
document.getElementById('btnSwitch').addEventListener('click', function() {
    const salaire = parseFloat(input.value);
    
    // 1. Appliquer les calculs 70/20/10
    affichageDepenses.textContent = (salaire * 0.7).toFixed(2);
    affichagePlaisirs.textContent = (salaire * 0.1).toFixed(2);
    affichageEpargne.textContent = (salaire * 0.2).toFixed(2);
    
    // 2. Mettre à jour les titres
    document.querySelector('.box:nth-child(1) h3').textContent = "Dépenses (70%)";
    document.querySelector('.box:nth-child(2) h3').textContent = "Plaisir (10%)";
    document.querySelector('.box:nth-child(3) h3').textContent = "Epargne (20%)";
    
    // 3. Vérification si toujours dépassé
    const valReelDep = parseFloat(reelDepenses.value);
    const valReelPlai = parseFloat(reelPlaisirs.value);
     const valReelEpa = parseFloat(reelEpargne.value);
    
    if (
    valReelDep > (salaire * 0.7) ||
    valReelPlai > (salaire * 0.1) ||
    valReelEpa < (salaire * 0.2)
) {
        // Message d'alerte spécifique
        document.getElementById('texteSuggestion').textContent = 
            "Même avec le modèle 70/20/10, votre budget est dépassé. Veuillez revoir vos dépenses pour ajuster votre situation.";
        
        // Faire disparaître le bouton
        document.getElementById('btnSwitch').style.display = "none";
    } else {
        document.getElementById('texteSuggestion').textContent = "Le modèle 70/20/10 est respecté !";
        document.getElementById('btnSwitch').style.display = "none";
    }
});

const btnReset = document.getElementById('btnReset');

btnReset.addEventListener('click', function() {

    // Vide les champs
    input.value = "";
    reelDepenses.value = "";
    reelPlaisirs.value = "";
    reelEpargne.value = "";

    // Remet les résultats à zéro
    affichageDepenses.textContent = "0";
    affichagePlaisirs.textContent = "0";
    affichageEpargne.textContent = "0";

    // Remet les titres du modèle 50/30/20
    document.querySelector('.box:nth-child(1) h3').textContent = "Dépenses (50%)";
    document.querySelector('.box:nth-child(2) h3').textContent = "Plaisir (30%)";
    document.querySelector('.box:nth-child(3) h3').textContent = "Epargne (20%)";

    // Cache les messages
    document.getElementById('messageAlerte').textContent = "";
    document.getElementById('texteSuggestion').textContent = "";
    document.getElementById('suggestionContainer').style.display = "none";

    // Réaffiche le bouton 70/20/10
    document.getElementById('btnSwitch').style.display = "inline-block";

    // Retour au modèle de départ
    modele702010 = false;
});
