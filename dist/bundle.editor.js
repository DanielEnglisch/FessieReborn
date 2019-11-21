var paintID=0,scale=64,xsize=20,ysize=20,world=[],context=null,canvas=null,Vec=function(e,t){this.x=e,this.y=t},tex=new TexturesBundle,loadEditor=function(e){world=[],xsize=e.split("X")[0].length,ysize=e.split("X").length;for(var t=0,s=0;s<e.length;s++)"X"!=e.charAt(s)&&(world[t++]=e.charAt(s));canvas.width=scale*xsize,canvas.height=scale*ysize,console.log(xsize+" - "+ysize)},getData=function(){for(var e="",t=0;t<xsize;t++){for(var s=0;s<ysize;s++)null!=world[t*xsize+s]&&(e+=""+world[t*xsize+s]);e+="X"}return e=e.substring(0,e.length-1)},main=function(){tex.load("../img/",(function(){})),$("img").click((function(e){"10x10"==e.target.id?loadEditor("1111111111X1255555551X1555545551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555561X1111111111"):"20x20"==e.target.id?loadEditor("11111111111111111111X12555555555455555561X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X11111111111111111111"):"test"==e.target.id?window.location.href="../?data="+getData():"export"==e.target.id?alert(location.protocol+"//"+location.host+location.pathname+"../?data="+getData()):(paintID=e.target.id,$("img").css("border","none"),e.target.style.border="3px solid rgb(248, 132, 0)")})),(canvas=document.getElementById("screen")).width=scale*ysize,canvas.height=scale*xsize,context=canvas.getContext("2d"),""!=levelString?loadEditor(levelString):loadEditor("1111111111X1255555551X1555545551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555561X1111111111"),canvas.addEventListener("mousedown",(function(e){if(paintID==Block.PLAYER)for(var t=0;t<world.length;t++)world[t]==Block.PLAYER&&(world[t]=Block.AIR);else if(paintID==Block.EXIT)for(t=0;t<world.length;t++)world[t]==Block.EXIT&&(world[t]=Block.AIR);world[Math.floor(e.offsetX/scale)*ysize+Math.floor(e.offsetY/scale)]=paintID}),!1),loop()},loop=function(){draw(),requestAnimationFrame(loop)},draw=function(){context.clearRect(0,0,canvas.width,canvas.height);for(var e=0;e<xsize;e++)for(var t=0;t<ysize;t++)world[e*ysize+t]==Block.AIR?(context.drawImage(tex.air,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.WALL?(context.drawImage(tex.wall,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.STEEL_WALL?(context.drawImage(tex.steel_wall,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.DUMPSTER?(context.drawImage(tex.dumpster.images[0],e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.DIRT?(context.drawImage(tex.dirt,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.PLAYER?(context.drawImage(tex.fessie_neutral,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.TRASH?(context.drawImage(tex.trash.images[6],e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.TOXIC_TRASH?(context.drawImage(tex.toxic_trash.images[3],e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.EXIT?(context.drawImage(tex.exit_open,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.SILVER_MONSTER?(context.drawImage(tex.silver_monster_anim.getImage(),e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.BLUE_WALL?(context.drawImage(tex.blue_wall,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.SEWER?(context.drawImage(tex.sewer,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.BOMB?(context.drawImage(tex.bomb,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.WALL_ORGANIC?(context.drawImage(tex.wall_organic,e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.TRASH_MONSTER?(context.drawImage(tex.trash_monster_center.getImage(),e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.SLIME_MONSTER?(context.drawImage(tex.slime_monster_center.getImage(),e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.FORCE_FIELD?(context.drawImage(tex.force_field.getImage(),e*scale,t*scale,scale,scale),context.stroke()):world[e*ysize+t]==Block.FIRE_ORB&&(context.drawImage(tex.fire_orb.getImage(),e*scale,t*scale,scale,scale),context.stroke())};const Block={AIR:0,WALL:1,PLAYER:2,DUMPSTER:3,TRASH:4,DIRT:5,EXIT:6,STEEL_WALL:7,SILVER_MONSTER:8,BOMB:9,SEWER:"A",BLUE_WALL:"B",WALL_ORGANIC:"C",TRASH_MONSTER:"D",SLIME_MONSTER:"E",FORCE_FIELD:"F",FIRE_ORB:"G",TOXIC_TRASH:"H"},Explosion={FIRE:0,SLIME:1,TRASH:2,BREATH:3},Direc={UP:0,DOWN:1,LEFT:2,RIGHT:3,NONE:4};function TexturesBundle(){this.loadingImages=0,this.allTexturesLoading=!1,this.fessie_neutral=new Image,this.fessie_dead=new Image,this.wall=new Image,this.air=new Image,this.dirt=new Image,this.exit_open=new Image,this.exit_closed=new Image,this.steel_wall=new Image,this.bomb=new Image,this.blue_wall=new Image,this.sewer=new Image,this.wall_organic=new Image,this.trash=new VariantTexture,this.toxic_trash=new VariantTexture,this.dumpster=new VariantTexture,this.slime_explosion=new Animation(500),this.fire_explosion=new Animation(1e3),this.silver_monster_anim=new Animation(1500),this.fessie_right=new Animation(500),this.fessie_left=new Animation(500),this.fessie_up=new Animation(500),this.fessie_down=new Animation(500),this.fessie_idle_left=new Animation(500),this.fessie_idle_right=new Animation(500),this.fessie_idle_center=new Animation(500),this.fessie_grab_down=new Animation(250),this.fessie_grab_left=new Animation(250),this.fessie_grab_right=new Animation(250),this.fessie_grab_up=new Animation(250),this.fessie_exit=new Animation(2500),this.trash_monster_center=new Animation(250),this.trash_monster_left=new Animation(250),this.trash_monster_right=new Animation(250),this.slime_monster_center=new Animation(500),this.slime_monster_left=new Animation(500),this.slime_monster_right=new Animation(500),this.slime_plop=new Animation(200),this.slime_plop_reverse=new Animation(200),this.force_field=new Animation(500),this.force_shield=new Animation(500),this.fire_orb=new Animation(500),this.fire_left=new Animation(500),this.fire_right=new Animation(500),this.callback=null,this.load=function(e,t){this.callback=t,this.fessie_neutral=this.blockloadImage(e+"fessie_neutral.png"),this.fessie_dead=this.blockloadImage(e+"fessie_dead.png"),this.wall=this.blockloadImage(e+"wall.png"),this.exit_closed=this.blockloadImage(e+"exit_closed.png"),this.exit_open=this.blockloadImage(e+"exit_open.png"),this.trash.load(e+"trash/"),this.toxic_trash.load(e+"toxic_trash/"),this.dumpster.load(e+"dumpster/"),this.air=this.blockloadImage(e+"air.png"),this.dirt=this.blockloadImage(e+"dirt.png"),this.steel_wall=this.blockloadImage(e+"steel_wall.png"),this.bomb=this.blockloadImage(e+"bomb.png"),this.blue_wall=this.blockloadImage(e+"bluewall.png"),this.sewer=this.blockloadImage(e+"sewer.png"),this.wall_organic=this.blockloadImage(e+"wall_organic.png"),this.slime_explosion.load(e+"slime_explosion/"),this.fire_explosion.load(e+"fire_explosion/"),this.silver_monster_anim.load(e+"silver_monster/"),this.fessie_right.load(e+"fessie_right/"),this.fessie_left.load(e+"fessie_left/"),this.fessie_down.load(e+"fessie_down/"),this.fessie_up.load(e+"fessie_up/"),this.fessie_idle_center.load(e+"fessie_idle_center/"),this.fessie_idle_left.load(e+"fessie_idle_left/"),this.fessie_idle_right.load(e+"fessie_idle_right/"),this.fessie_grab_up.load(e+"fessie_grab_up/"),this.fessie_grab_down.load(e+"fessie_grab_down/"),this.fessie_grab_left.load(e+"fessie_grab_left/"),this.fessie_grab_right.load(e+"fessie_grab_right/"),this.fessie_exit.load(e+"fessie_exit/"),this.trash_monster_center.load(e+"trash_monster_center/"),this.trash_monster_left.load(e+"trash_monster_left/"),this.trash_monster_right.load(e+"trash_monster_right/"),this.slime_monster_center.load(e+"slime_monster_center/"),this.slime_monster_left.load(e+"slime_monster_left/"),this.slime_monster_right.load(e+"slime_monster_right/"),this.slime_plop.load(e+"slime_plop/"),this.slime_plop_reverse.load(e+"slime_plop_reverse/"),this.force_field.load(e+"force_field/"),this.force_shield.load(e+"force_shield/"),this.fire_left.load(e+"fire_left/"),this.fire_right.load(e+"fire_right/"),this.fire_orb.load(e+"fire_orb/"),this.allTexturesLoading=!0},this.blockloadImage=function(e){var t=this,s=new Image;return s.src=e,this.loadingImages++,s.addEventListener("error",(function(){console.error("Error loading "+e),t.loadingImages--,0==t.loadingImages&&t.allTexturesLoading&&t.callback()})),s.onload=function(){t.loadingImages--,0==t.loadingImages&&t.allTexturesLoading&&t.callback()},s}}function Animation(e){this.imageId=0,this.duration=e,this.reset=function(){this.imageId=0},this.getImage=function(){return this.images[this.imageId]},this.images=[],this.cooldownUntil=Date.now()+this.duration/this.images.length,this.load=function(e){for(var t=loadJSON(e+"info.json").num_images,s=0;s<t;s++)this.images[s]=tex.blockloadImage(e+""+s+".png");this.cooldownUntil=Date.now()+this.duration/this.images.length},this.update=function(){Date.now()>=this.cooldownUntil&&(this.imageId=(this.imageId+1)%this.images.length,this.cooldownUntil=Date.now()+this.duration/this.images.length)}}function VariantTexture(){this.cloneImage=function(){return this.images[Math.floor(Math.random()*this.images.length)]},this.images=[],this.load=function(e){for(var t=loadJSON(e+"info.json").num_images,s=0;s<t;s++)this.images[s]=tex.blockloadImage(e+""+s+".png")}}function inherits(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}Vec=function(e,t){this.x=e,this.y=t};var posToBlock=function(e){return new Vec(Math.floor(e.x),Math.floor(e.y))};function loadJSON(e){var t=loadTextFileAjaxSync(e,"application/json");return JSON.parse(t)}function loadTextFileAjaxSync(e,t){var s=new XMLHttpRequest;return s.open("GET",e,!1),null!=t&&s.overrideMimeType&&s.overrideMimeType(t),s.send(),200==s.status?s.responseText:null}