// hello route
import { Router } from "express";
import { hello } from "../lib/locale_hello.js";
import { capitalize } from "../lib/string.js";

export const helloRouter = Router();

// reci zdravo na engleskom
helloRouter.get('/:name', (req, res, next) => {
    res.render(
        'message', 
        { title: `${ hello.en} ${capitalize( req.params.name )}!`});
});

//reci zdravo na specifičnom jeziku
helloRouter.get('/:lang/:name', (req, res, next) => {
    res.render(
        'message',
        { title: `${hello[req.params.lang] || hello.en} ${ capitalize( req.params.name ) }!` });
});
