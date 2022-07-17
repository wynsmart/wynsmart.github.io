function indexLevel(level, clan){
  var x = Number(level);
  if (clan == "develop"){
    //favor for all levels
    var fav = 1.0;
    if (x<=75){
      var a = 7e-4;
      var b = 0.0168;
      return (x>0) ?
        Math.round(a*Math.pow(x,2)+b*Math.pow(x,1)+fav, 2) : 0;
    }
    if (x>75){
      var a = -7.3e-3;
      var b = 1.0799;
      var c = -35.002;
      return (x<100) ?
        Math.round(a*Math.pow(x,2)+b*Math.pow(x,1)+c+fav, 2) : 0;
    }
  }
  if (clan == "elite"){
    // favor for all levels
    var fav = 1.5;
    var a = 1.152e-5;
    var b = -0.0014;
    var c = 0.0699;
    return (x>0) ?
      Math.round(a*Math.pow(x,3)+b*Math.pow(x,2)+c*Math.pow(x,1)+fav, 2) : 0;
  }
  if (clan == "master"){
    // favor for all levels
    var fav = 1.5;
    var a = 1e-5;
    var b = -0.0016;
    var c = 0.0917;
    return (x>0) ?
      Math.round(a*Math.pow(x,3)+b*Math.pow(x,2)+c*Math.pow(x,1)+fav, 2) : 0;
  }
  return 0;
}

function indexWins(wins){
  var x = Number(wins);
  var a = 4.233e-7;
  var b = -0.0002;
  var c = 0.0395;
  return (x>0) ?
    Math.round(a*Math.pow(x,3)+b*Math.pow(x,2)+c*Math.pow(x,1), 2) : 0;
}

function indexDonate(donate){
  var x = Number(donate);
  var a = 1.397e-10;
  var b = -1.022e-6;
  var c = 0.0029;
  return (x>0) ?
    Math.round(a*Math.pow(x,3)+b*Math.pow(x,2)+c*Math.pow(x,1), 2) : 0;
}

function indexReceive(receive){
  var x = Number(receive);
  var a = 4.115e-10;
  var b = -2.377e-6;
  var c = 0.0046;
  return (x>0) ?
    Math.round(a*Math.pow(x,3)+b*Math.pow(x,2)+c*Math.pow(x,1), 2) : 0;
}

function indexFinal(indLevel, indWins, indDonate, indReceive){
  var f = [indWins, indDonate, indReceive].map(Number).sort();
  return Math.round(f[0]*0.1+f[1]*0.25+f[2]*0.35+indLevel*0.3, 2);
}

function calcElderIndex(data){
  var indLevel = indexLevel(data.level, data.clan);
  var indWins = indexWins(data.wins);
  var indDonate = indexDonate(data.donate);
  var indReceive = indexReceive(data.receive);
  var indFinal = indexFinal(indLevel, indWins, indDonate, indReceive);
  return {
    indLevel: indLevel,
    indWins: indWins,
    indDonate: indDonate,
    indReceive: indReceive,
    indFinal: indFinal,
  };
}
