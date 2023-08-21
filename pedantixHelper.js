// ==UserScript==
// @name         pedantixHelper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically insert common words into Pedantix
// @author       MisterRobot42
// @match        https://cemantix.certitudes.org/pedantix
// @grant        none
// ==/UserScript==

/**
 * Inserts a word into the Pedantix input field and clicks the submit button.
 * Displays an error message if the input field or submit button cannot be found.
 * @param {string} word - The word to insert into the input field.
 */
function insertWord(word) {
    const inputField = document.querySelector("#pedantix-guess");
    const submitButton = document.querySelector("#pedantix-guess-btn");

    // Check if the input field and submit button exist
    if (inputField && submitButton) {
        // Set the input field value to the word and click the submit button
        inputField.value = word;
        submitButton.click();
    } else {
        // Display an error message if the input field or submit button cannot be found
        console.error("Input field or submit button not found");
    }
}

/**
 * Processes an array of word lists with a given delay between words and an initial delay.
 * Recursively calls itself to process the next list after the current list has been fully processed.
 * @param {array} lists - An array of word lists to process.
 * @param {number} delayBetweenWords - The delay in milliseconds between each word.
 * @param {number} initialDelay - The initial delay in milliseconds before processing the first word.
 */
function processWordLists(lists, delayBetweenWords, initialDelay) {
    if (lists.length === 0) {
        return;
    }

    // Get the next list from the array
    const currentList = lists.shift();
    let totalDelay = initialDelay;

    // Loop through the words in the current list and insert them with a delay between each word
    for (let i = 0; i < currentList.length; i++) {
        setTimeout(() => insertWord(currentList[i]), totalDelay);
        totalDelay += delayBetweenWords;
    }

    // Recursively call the function to process the next list after the current list has been fully processed
    setTimeout(() => processWordLists(lists, delayBetweenWords, 0), totalDelay);
}

(function() {
    'use strict';

    // differents lists to cover a large amount of simple french words
    const commonPrepositions = ["à", "après", "avant", "avec", "chez", "dans", "de", "depuis", "derrière", "devant", "en", "entre", "et", "hors", "jusque", "ni", "ou", "par", "pour", "sans", "sauf", "selon", "sous", "sur", "vers"];
    const commonVerbs = ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir", "devoir", "prendre", "trouver", "donner", "sembler", "mettre", "croire", "parler", "aimer", "passer", "montrer", "entendre", "demander", "sentir", "laisser", "rester", "sembler", "tenir", "commencer", "finir", "suivre", "apprendre", "comprendre", "découvrir", "chercher", "écouter", "créer"];
    const commonAdjectives = ["bon", "mauvais", "grand", "petit", "jeune", "vieux", "beau", "joli", "nouveau", "ancien", "long", "court", "haut", "bas", "gros", "mince", "fort", "faible", "chaud", "froid", "lourd", "léger", "clair", "sombre", "rapide", "lent", "riche", "pauvre", "libre", "occupé"];
    const commonNouns = ["homme", "femme", "enfant", "ami", "travail", "maison", "école", "ville", "pays", "monde", "animaux", "chien", "chat", "oiseau", "temps", "histoire", "livre", "film", "musique", "art", "science", "technologie", "politique", "économie", "sport", "voiture", "route", "eau", "air", "terre", "feu", "plante", "arbre", "fleur", "soleil", "lune", "étoile", "nuage", "montagne", "mer", "rivière", "lac", "forêt", "désert", "île"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième", "neuvième", "dixième"];
    const letterPrefixes = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "anti", "auto", "bi", "co", "contra", "de", "dis", "en", "ex", "extra", "hémi", "hétéro", "homo", "hybride", "hyper", "hypo", "in", "inter", "intra", "macro", "micro", "mono", "multi", "non", "omni", "para", "poly", "post", "pré", "pro", "pseudo", "ré", "semi", "sub", "supra", "sur", "syn", "trans", "tri", "ultra", "uni"];
    const themes = ["biographie", "géographie", "histoire", "culture", "art", "littérature", "cinéma", "télévision", "musique", "théâtre", "peinture", "sculpture", "architecture", "photographie", "danse", "mode", "gastronomie", "langue", "philosophie", "religion", "mythologie", "psychologie", "sociologie", "anthropologie", "éducation", "politique", "droit", "économie", "entreprise", "finance", "marketing", "science", "mathématiques", "physique", "chimie", "biologie", "astronomie", "géologie", "météorologie", "écologie", "informatique", "technologie", "internet", "robotique", "intelligence_artificielle", "médecine", "santé", "anatomie", "pharmacologie", "vétérinaire", "agriculture", "horticulture", "botanique", "zoologie", "sport", "jeux", "loisirs", "tourisme", "transport", "automobile", "aéronautique", "spatial", "ferroviaire", "maritime", "urbanisme", "énergie", "environnement", "climat", "démographie", "événement", "guerre", "révolution", "invention", "découverte", "exploration", "première", "record", "prix", "distinction", "célébrité", "organisation", "institution", "association", "fondation", "parti", "politique", "mouvement", "manifestation", "réforme", "loi", "règlement", "norme", "traité", "accord", "convention", "protocole"];
    
    const mostUsed_common = ["de", "la", "l", "et", "le", "les", "à", "en", "des", "est", "d", "un", "du", "une", "dans", "par", "qui", "ou", "au", "il", "plus", "que", "pour", "sont", "a", "sur", "son", "avec", "comme", "elle", "ce", "s", "c", "se", "sa", "deux", "aux", "qu", "être", "ses", "pas", "été", "ainsi", "ne", "également", "n", "dont", "aussi", "ont", "ces", "après", "mais", "entre", "autres", "sous", "fait", "siècle", "même", "cette", "ville", "guerre", "leur", "on", "pays", "partie", "nom", "corps", "physique", "nord", "très", "y", "forme", "ils", "monde", "peut", "sud", "trois", "jusqu", "point", "depuis", "grande", "groupe", "où", "notamment", "selon", "premier", "x", "elles", "grand", "terme", "aminés", "plusieurs", "puis", "bien", "non", "alors", "acides", "âge", "partir", "km"];
]   const mostUsed_full =  ["de", "la", "l", "et", "le", "les", "à", "en", "des", "être", "avoir", "d", "un", "du", "une", "dans", "par", "qui", "ou", "au", "il", "plus", "que", "pour", "sont", "a", "sur", "son", "avec", "comme", "elle", "ce", "s", "c", "se", "sa", "deux", "aux", "qu", "être", "ses", "pas", "été", "ainsi", "ne", "également", "n", "dont", "aussi", "ont", "ces", "après", "mais", "entre", "autres", "sous", "fait", "siècle", "même", "cette", "ville", "guerre", "leur", "on", "pays", "partie", "nom", "corps", "physique", "nord", "très", "y", "forme", "ils", "monde", "peut", "sud", "trois", "jusqu", "point", "depuis", "grande", "groupe", "où", "notamment", "selon", "premier", "x", "elles", "grand", "terme", "aminés", "plusieurs", "puis", "bien", "non", "alors", "acides", "âge", "partir", "km", "exemple", "europe", "espace", "origine", "ensemble", "ans", "espèces", "années", "capitale", "millions", "utilisé", "mandarin", "langue", "france", "fin", "système", "suite", "politique", "ouest", "chine", "moyen", "grandeur", "anglais", "théorie", "mort", "lois", "histoire", "union", "lieu", "displaystyle", "empire", "accouchement", "nombre", "république", "centre", "énergie", "cas", "acide", "loi", "cours", "particules", "habitants", "temps", "fonction", "ancien", "espèce", "objet", "chinois", "considéré", "xixe", "société", "états", "population", "importante", "appelé", "mondiale", "connu", "dubaï", "particule", "phénomène", "période", "région", "noir", "dynastie", "langues", "français", "principalement", "situé", "forces", "livre", "rôle", "hommes", "unis", "lorentz", "grec", "appelée", "vie"];
    //Add this one to "wordLists" if you want but it's kind of cheaty. And long to process.
    const mostCommonWikipediaVerbs = ["abandonner", "accepter", "accompagner", "acheter", "acquérir", "adresser", "adopter", "affirmer", "agir", "ajouter", "aller", "allumer", "améliorer", "amener", "analyser", "annoncer", "apercevoir", "apparaître", "appeler", "apporter", "apprendre", "approcher", "arrêter", "arriver", "articuler", "assister", "associer", "assurer", "attaquer", "atteindre", "attribuer", "augmenter", "avancer", "avoir", "baisser", "battre", "boire", "caler", "calmer", "capturer", "caractériser", "cerner", "changer", "charger", "chercher", "choisir", "chroniquer", "circonscrire", "circonspecter", "circonvenir", "clairer", "cliquer", "clore", "coiffer", "collaborer", "collecter", "combattre", "commencer", "commenter", "communiquer", "comparer", "compléter", "composer", "comprendre", "compter", "concéder", "conclure", "condamner", "conduire", "confirmer", "conformer", "confronter", "connaître", "connecter", "conquérir", "consacrer", "conseiller", "considérer", "consommer", "construire", "contacter", "contenir", "continuer", "contraindre", "contrôler", "convaincre", "copier", "corriger", "corrompre", "coucher", "couper", "courir", "coûter", "craindre", "créer", "critiquer", "croire", "célébrer", "danser", "demeurer", "demander", "décrire", "définir", "développer", "devenir", "devoir", "dicter", "diffuser", "diminuer", "dire", "discuter", "disparaître", "disposer", "divulguer", "donner", "douter", "durer", "échapper", "éclaircir", "écouter", "écrire", "effacer", "effectuer", "élever", "émigrer", "émouvoir", "employer", "encourager", "endommager", "endormir", "enfanter", "engager", "enlever", "ennuyer", "enrichir", "enseigner", "entendre", "entraîner", "entreprendre", "envahir", "envoyer", "éprouver", "errer", "essayer", "essuyer", "estimer", "étayer", "établir", "éteindre", "étendre", "étonner", "évaluer", "éviter", "examiner", "exciter", "exiger", "expliquer", "exploiter", "exposer", "exprimer", "fabriquer", "faire", "falloir","fasciner", "fermer", "fonder", "forcer", "former", "fournir", "frapper", "frayer", "fuire", "gagner", "garder", "glisser", "gouverner", "gronder", "grossir", "habiller", "habiter", "haïr", "identifier", "ignorer", "imaginer", "imiter", "impliquer", "importer", "imposer", "impressionner", "inciter", "inclure", "indiquer", "induire", "informer", "ingérer", "initier", "inonder", "inscrire", "insister", "inspirer", "installer", "instruire", "interdire", "interpréter", "intervenir", "introduire", "inventer", "investir", "inviter", "jaillir", "jeter", "joindre", "juger", "jurer", "laisser", "lancer", "lever", "lier", "limiter", "lire", "loger", "maintenir", "manger", "manier", "manquer", "marier", "marquer", "mener", "mentir", "mériter", "mesurer", "mettre", "modifier", "monter", "montrer", "mourir", "nager", "naviguer", "nécessiter", "nettoyer", "nommer", "noter", "nourrir", "nouveler", "obéir", "obliger", "observer", "obtenir", "occuper", "offrir", "omettre", "opposer", "opter", "oser", "oublier", "ouvrir", "paraître", "parer", "partager", "participer", "partir", "passer", "pâtir", "payer", "penser", "perdre", "permettre", "persister", "périr", "peser", "pousser", "pouvoir", "pratiquer", "prendre", "préparer", "présenter", "prescrire", "prévoir", "produire", "profiter", "programmer", "projeter", "promettre", "prononcer", "proposer", "protéger", "prouver", "provenir", "publier", "quitter", "raccourcir", "raconter", "radicaliser", "raisonner", "ramener", "ranger", "rapporter", "rassurer", "rattraper", "recevoir", "réclamer", "recommander", "reconnaître", "recourir", "recouvrir", "réduire", "réfléchir", "réformer", "réfuter", "régler", "régner", "regretter", "rejoindre", "relire", "remercier", "remplacer", "remplir", "rencontrer", "rendre", "renforcer", "renoncer", "renseigner", "rentrer", "répandre", "réparer", "répéter", "repérer", "répondre", "reposer", "reprendre", "reprocher", "requérir", "résister", "respirer", "ressentir", "retenir", "retirer", "retourner","véler", "vendre", "venir", "verbaliser", "vérifier", "verser", "violer", "viser", "visiter", "vivre", "voiler", "voir", "voler", "voter"];

    //Concatenate all the lists into one.
    //By default, using only mostUsed_Common, add more if wanted
    const wordLists = [mostUsed_common];

    // If the time between each submission is less than 500 milliseconds, the server may stop processing some of the words due to the rapid pace, resulting in incomplete processing.
    const delayBetweenWords = 500;
    // Initial 3-second delay before inserting words on web page load. Increase the value if you encounter issues.
    const initialDelay = 3000;

    processWordLists(wordLists, delayBetweenWords, initialDelay);

})();