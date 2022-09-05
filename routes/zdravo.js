// zdravo route
import { Router } from "express";
import { zdravo } from "../lib/locale_zdravo.js";
import { capitalize } from "../lib/string.js";

export const zdravoRouter = Router();

// reci zdravo na engleskom
zdravoRouter.get('/:name', (req, res, next) => {
    res.render(
        'message', 
        { title: `${ zdravo.en} ${capitalize( req.params.name )}!`});
});

//reci zdravo na specifičnom jeziku
zdravoRouter.get('/:lang/:name', (req, res, next) => {
    res.render(
        'message',
        { title: `${zdravo[req.params.lang] || zdravo.en} ${ capitalize( req.params.name ) }!` });
});
