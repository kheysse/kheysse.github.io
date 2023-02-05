var bottommatrix = new Canvas("bottomsliders", [0,0, 2,2]);
var bottomleft = new Canvas("bottomleft", [-4,-4,4,4]);
var bottomright = new Canvas("bottomright", [-4,-4,4,4]);


bottommatrix.margins = [20,5,20,5];
bottommatrix.setUpCoordinates();
bottomleft.margins = [5,5,5,5];
bottomleft.setUpCoordinates();
bottomright.margins = [5,5,5,5]
bottomright.setUpCoordinates();

var dx = 0.05;
var mkslider = function(xr, y, canvas, method, label) {
    var s = new Slider(xr, y, [-2,2], method);
    s.ticks = [-2,1,2]
    s.labels = [-2,1,2]
    s.point.style = "circle";
    s.point.fillColor = "gray"
    s.point.size = 5;
    label = new Label(label, [xr[0], y])
    label.offset = [-8,10]
    label.alignment = "rb"
    canvas.addPlotable(label)
    canvas.addPlotable(s);
    canvas.addMoveable(s);
    return s;
}

var topupdate = function() {
    var ma = 1
    var mb = 0
    var mc = -1
    var md = -2
    var det = ma*md - mb*mc;
    var x = v.head[0];
    var y = v.head[1];
    var a1 = [ma, mc];
    var a2 = [mb, md];
    trgrid.a1 = a1;
    trgrid.a2 = a2;
    if (Math.abs(det) < 0.03) {
	trgrid.a2 = trgrid.a1;
    }
    Av.head = [ma*x + mb*y, mc*x + md*y];
    topleft.draw();
    topright.draw()
}


var matrixLabela = new Label("test", [1.80,1]);
var matrixLabelb = new Label("test", [1.95,1]);
var matrixLabelc = new Label("test", [1.80,0.75]);
var matrixLabeld = new Label("test", [1.95,0.75]);


bottommatrix.addPlotable(matrixLabela);
bottommatrix.addPlotable(matrixLabelb);
bottommatrix.addPlotable(matrixLabelc);
bottommatrix.addPlotable(matrixLabeld);


var bottomupdate = function() {
    var ma = ba.coordinate();
    var mb = bb.coordinate();
    var mc = bc.coordinate();
    var md = bd.coordinate();
    v1.head = [ma,mc];
    v2.head = [mb,md];
    var det = ma*md - mb*mc;
    var a1 = [ma, mc];
    var a2 = [mb, md];
    tgrid.a1 = a1;
    tgrid.a2 = a2;
    if (Math.abs(det) < 0.03) {
	tgrid.a2 = tgrid.a1;
    }
    var x = v.head[0];
    var y = v.head[1];
    Av.head = [ma*x + mb*y, mc*x + md*y];
    polygon.points = [[0,0], a1, vadd(a1, a2), a2];

    matrixLabela.setText(ma.toFixed(3));
    matrixLabelb.setText(mb.toFixed(3));
    matrixLabelc.setText(mc.toFixed(3));
    matrixLabeld.setText(md.toFixed(3));
    
    bottommatrix.draw();
    
    bottomleft.draw();
    bottomright.draw()
}



var ba = mkslider([0, 0.75], 1.5, bottommatrix, bottomupdate, "a");
var bb = mkslider([0.9, 1.65], 1.5, bottommatrix, bottomupdate, "b");
var bc = mkslider([0, 0.75], 0.5, bottommatrix, bottomupdate, "c");
var bd = mkslider([0.9, 1.65], 0.5, bottommatrix, bottomupdate,"d");
ba.init(1);
bb.init(0);
bc.init(0);
bd.init(1);




var blgrid = new Grid([-4,1,4], [-4,1,4]);
bottomleft.addPlotable(blgrid);


var blaxes = new Axes();
blaxes.labels = [[-4,1,4], [-4,1,4]]
blaxes.ticks = [[-4,1,4], [-4,1,4]]
bottomleft.addPlotable(blaxes);

var braxes = new Axes();
braxes.labels = [[-4,1,4], [-4,1,4]]
braxes.ticks = [[-4,1,4], [-4,1,4]]

var lrect = new Rectangle([0,0], [1,1]);
lrect.fillColor = "lightgray";
lrect.strokeColor = "blue";
bottomleft.addPlotable(lrect);

var tgrid = new TGrid([1,0],[0,1]);
bottomright.addPlotable(tgrid);

var polygon = new Polygon([[0,0], [1,0], [1,1], [0,1]]);
polygon.fillColor = "lightgray";
polygon.strokeColor = "black";
bottomright.addPlotable(polygon);
bottomright.addPlotable(braxes);

var v1 = new Vector(1,0);
v1.fillColor = "gray";
var v2 = new Vector(0,1);
v2.fillColor = "gray";
//bottomright.addPlotable(v1);
//bottomright.addPlotable(v2);

var v = new Vector([1,0]);
v.move = function(p) {
    v.head = p;
    bottomupdate();
}
v.fillColor = "rgba(0, 0, 256, 0.5)";

var Av = new Vector([1,0]);
Av.fillColor = "rgba(256, 0, 0, 0.5)";
bottomright.addPlotable(Av);
bottomleft.addPlotable(v);
bottomleft.addMoveable(v);




bottomupdate();


