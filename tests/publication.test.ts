import test from 'node:test';import assert from 'node:assert/strict';
import {createPublication,presentationEngine as engine,slideText,openPresentation} from '@prisma/slides/slides-core';
test('plantillas propias de Publisher mantienen tamaño y textos al abrirlas de nuevo',async()=>{
 for(const template of ['blank','brochure','certificate']){
  const document=await createPublication(template),copy=await openPresentation(await engine.savePptx(document));
  assert.ok(Math.abs(copy.deck.size.cx-document.deck.size.cx)<=1);assert.ok(Math.abs(copy.deck.size.cy-document.deck.size.cy)<=1);
  const texts=copy.deck.slides[0].elements.map(slideText).join('\n');
  if(template==='certificate')assert.ok(texts.includes('Certificado'));
  if(template==='brochure')assert.ok(texts.includes('Nuestros servicios'));
 }
});
