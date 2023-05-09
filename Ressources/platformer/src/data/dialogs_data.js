export const getDialogs = () => {
    const dialogs_data = [];

    dialogs_data[0] = [{name : "Rain", avatar: "rain_spritesheet", words: ["Sun ! Elle a encore disparu !", "Il était de ta responsabilité de la surveiller !"]},
    {name : "Wind", avatar:"wind_spritesheet", words: ["..."]},
    {name : "Sun", avatar:"sun_spritesheet", words: ["Désolé...", "Ne vous inquiétez pas, elle ne doit pas être\nbien loin."]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["On finira par la perdre pour de bon un jour..."]},
    {name : "Sun", avatar:"sun_spritesheet", words: ["Partons à sa recherche !"]},
    ]; 



    dialogs_data[1] = [{name : "Wind", avatar:"wind_spritesheet", words: ["Ces ennemis..."]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["Vous pensez qu'il est derrière tout ça ?"]},
    {name : "Wind", avatar:"wind_spritesheet", words: ["Le contraire m'étonnerait beaucoup..."]}]; 

    dialogs_data[2] = [{name : "Sun", avatar: "sun_spritesheet",words: ["On est coincés !"]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["Non, regarde Sun ! Au pied de cette falaise, \ndes jeunes pousses."]},
    {name : "Sun", avatar: "sun_spritesheet",words: ["Ils poussent quoi ?"]},
    {name : "Wind", avatar: "wind_spritesheet",words: ["..."]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["Laisse tomber, laisse moi faire !"]},
    {name : "", avatar: "rain_spritesheet",words: ["Vous pouvez désormais contrôler Rain.\n\nAppuyez sur A pour afficher la roue \ndes personnages.", "Appuyez sur R pour créer un nuage au dessus \nde Rain"]}]; 


    dialogs_data[3] = [{name : "Rain", avatar: "rain_spritesheet",words: ["Hmmm...", "Même en sautant de toutes mes forces,\nje ne pense pas pouvoir atteindre l'autre côté."]},
    {name : "Sun", avatar:"sun_spritesheet", words: ["D'accord ! Laisse moi faire !"]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["Arrête Sun ! Aucune chance que tu y parviennes !", "Il aura notre peau un jour..."]},
    {name : "Wind", avatar: "wind_spritesheet",words: ["Et ce jour là fais moi penser à ne pas \nvous accompagner.", "Mais en attendant, je pense que je peux aider."]},
    {name : "", avatar: "wind_spritesheet",words: ["Vous pouvez désormais contrôler Wind.", "Appuyez sur R pour invoquer le vent dans la \ndirection de Wind.", "Appuyez sur Espace pour effectuer un dash."]},
]; 

    dialogs_data[4] = [{name : "Rain", avatar: "rain_spritesheet",words: ["Vous pensez à ce que je pense ?"]},
    {name : "Sun", avatar:"sun_spritesheet", words: ["Oui ! On va juste foncer assez vite pour\nque les flammes ne nous touchent pas !"]},
    {name : "Rain", avatar:"rain_spritesheet", words: ["Tu penses à ce que je pense Wind ?"]},
    {name : "Wind", avatar: "wind_spritesheet",words: ["Oui on peut essayer, l'union fait la force."]},
]; 

    dialogs_data[5] = [{name : "Rain", avatar: "rain_spritesheet",words: ["Ca ne fait aucun doute, c'est bien lui qui\n est derrière tout ça."]},
    {name : "Wind", avatar:"wind_spritesheet", words: ["Ca risque d'être plus compliqué \nque ce que je pensais."]},
]; 

    return dialogs_data; 
}
    













