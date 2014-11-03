var M=
{
	vecRotateX:function(v,t)
	{
		return [v[0],v[1]*Math.cos(t)-v[2]*Math.sin(t),v[1]*Math.sin(t)+v[2]*Math.cos(t)];
	},

	vecRotateY:function(v,t)
	{
		return [v[2]*Math.sin(t)+v[0]*Math.cos(t),v[1],v[2]*Math.cos(t)-v[0]*Math.sin(t)];
	},

	vecRotateZ:function(v,t)
	{
		return [v[0]*Math.cos(t)-v[1]*Math.sin(t),v[0]*Math.sin(t)+v[1]*Math.cos(t),v[2]];
	},

	unit:function(v)
	{
		var d=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
		return [v[0]/d,v[1]/d,v[2]/d];
	},

	cross:function(a,b)
	{
		return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
	},

	identity:function()
	{
		return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
	},

	add:function(a,b)
	{
		var r=[];
		for(var c=0;c<16;c++)
		{
			r[c]=a[c]+b[c];
		}
		return r;
	},

	scalar:function(s,m)
	{
		var r=[];
		for(var c=0;c<16;c++)
		{
			r[c]=m[c]*s;
		}
		return r;
	},

	translate:function(v)
	{
		return [1,0,0,0,0,1,0,0,0,0,1,0,v[0],v[1],v[2],1];
	},

	rotate:function(v,t)
	{
		var x=M.unit(v)[0],y=M.unit(v)[1],z=M.unit(v)[2];
		var m=[0,z,-y,0,-z,0,x,0,y,-x,0,0,0,0,0,0];
		return M.add(M.identity(),M.add(M.scalar(Math.sin(t),m),M.scalar((1-Math.cos(t)),M.multiply(m,m))));
	},

	transpose:function(m)
	{
		var r=[];
		for(var c=0;c<16;c++)
		{
			r[c]=m[c%4*4+Math.floor(c/4)];
		}
		return r;
	},

	vector:function(m,v)
	{
		var r=[];
		for(var c=0;c<3;c++)
		{
			r[c]=0;
			for(var d=0;d<4;d++)
			{
				r[c]+=m[d*4+c]*v[d];
			}
		}
		return r;
	},

	multiply:function(a,b)
	{
		var r=[];
		for(var c=0;c<16;c++)
		{
			r[c]=0;
			for(var d=0;d<4;d++)
			{
				r[c]+=a[d*4+c%4]*b[d+Math.floor(c/4)*4];
			}
		}
		return r;
	},

	lookAt:function(e,c,u)
	{
		var f=[c[0]-e[0],c[1]-e[1],c[2]-e[2]],
		z=M.unit([-f[0],-f[1],-f[2]]),
		x=M.unit(M.cross(z,M.unit(u))),
		y=M.cross(z,x);
		return M.multiply([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,0,0,0,1],M.translate(f));
	},

	perspective:function(f,a,N,F)
	{
		p=-1/Math.tan(f*Math.PI/360);
		return [p/a,0,0,0,0,p,0,0,0,0,F/(N-F),-1,0,0,N*F/(N-F),0];
	},
};

var c=document.getElementById('canvas');
c.width=256;
c.height=256;

var gl=c.getContext('experimental-webgl');

gl.enable(gl.DEPTH_TEST);
//			gl.enable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE);

var prg=program("vert","frag");

var pos=[];
var nor=[];
var col=[];
var index=[];
var mark=[];

var t=0;
var polygonCount=0;
var frameTime=[];

function disp()
{
	pos=[];
	nor=[];
	col=[];
	index=[];
	mark=[];

	sphere(16,16,1,0);
	mark[0]=index.length;

	setAtt('att_pos',pos,3);
	setAtt('att_nor',nor,3);
	setAtt('att_col',col,3);

	var ibo=create_ibo(index);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);

	{
		gl.clearColor(0.,0.,0.,0.);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		var camPos=[0,0,2];
		var matM=M.rotate(M.vector(M.rotate([.4,0,.6],t*.031),[.2,1,0,1]),t*.05);
		var matV=M.lookAt(camPos,[0,0,0],[0,1,0]);
		var matP=M.perspective(70,c.width/c.height,.1,100);
		var uni_matVP=M.multiply(matP,M.multiply(matV,matM));
		gl.uniformMatrix4fv(gl.getUniformLocation(prg,'uni_matVP'),false,uni_matVP);

		gl.uniform1f(gl.getUniformLocation(prg,'uni_t'),t);

		gl.uniform1i(gl.getUniformLocation(prg,'uni_p'),0);
		gl.drawElements(gl.TRIANGLES,mark[0],gl.UNSIGNED_SHORT,0);
		gl.uniform1i(gl.getUniformLocation(prg,'uni_p'),1);
		gl.drawElements(gl.LINE_STRIP,mark[0],gl.UNSIGNED_SHORT,0);
	}

	gl.flush();

	t++;
	setTimeout("disp()",1000/60);
}
disp();

function poly(_i,_c)
{
	l=_i.length;
	for(var c=6;c<l;c+=3)
	{
		for(var c2=0;c2<3;c2++)
		{
			pos.push(_i[c2]);
		}
		for(var c2=c-3;c2<c+3;c2++)
		{
			pos.push(_i[c2]);
		}

		{
			var v=M.cross([_i[c-3]-_i[0],_i[c-2]-_i[1],_i[c-1]-_i[2]],[_i[c]-_i[c-3],_i[c+1]-_i[c-2],_i[c+2]-_i[c-1]]);
			for(var c2=0;c2<3;c2++)
			{
				nor.push(v[0]);nor.push(v[1]);nor.push(v[2]);
			}
		}

		for(var c2=0;c2<3;c2++)
		{
			index.push(col.length/3);
			switch(c2)
			{
				case 0:col.push(1,1);break;
				case 1:col.push(0,c==6?1:0);break;
				case 2:col.push(c==6?0:1,0);break;
			}
			col.push(_c);
		}
	}
}

function polyCube(_w,_h,_d,_c)
{
	var w=_w/2,h=_h/2,d=_d/2;
	addPoly([w,h,d,-w,h,d,-w,-h,d,w,-h,d],_c);
	addPoly([-w,h,-d,w,h,-d,w,-h,-d,-w,-h,-d],_c);
	addPoly([w,h,-d,w,h,d,w,-h,d,w,-h,-d],_c);
	addPoly([-w,h,d,-w,h,-d,-w,-h,-d,-w,-h,d],_c);
	addPoly([w,h,-d,-w,h,-d,-w,h,d,w,h,d],_c);
	addPoly([w,-h,d,-w,-h,d,-w,-h,-d,w,-h,-d],_c);
}

function sphere(x,y,r,c)
{
	var l=pos.length/3;
	x=Math.floor(x);y=Math.floor(y);
	pos.push(0,r,0);
	nor.push(0,r,0);
	col.push(c,c,c);
	for(var cy=1;cy<y-1;cy++)
	{
		for(var cx=0;cx<x;cx++)
		{
			var v=[0,r,0];
			v=M.vecRotateZ(v,cy/(y-1)*Math.PI);
			v=M.vecRotateY(v,cx/(x)*Math.PI*2);
			pos.push(v[0],v[1],v[2]);
			nor.push(v[0],v[1],v[2]);
			col.push(c,c,c);
		}
	}
	pos.push(0,-r,0);
	nor.push(0,-r,0);
	col.push(c,c,c);
	for(var c=0;c<x;c++)
	{
		index.push(l,l+1+c%x,l+1+(c+1)%x);
	}
	for(var cy=0;cy<y-3;cy++)
	{
		for(var cx=0;cx<x;cx++)
		{
			index.push(1+x*cy+(cx)%x,1+x*(cy+1)+(cx+1)%x,1+x*cy+(cx+1)%x);
			index.push(1+x*cy+(cx)%x,1+x*(cy+1)+(cx)%x,1+x*(cy+1)+(cx+1)%x);
		}
	}
	for(var c=0;c<x;c++)
	{
		index.push(l+x*(y-2)+1,l+x*(y-3)+1+(c+1)%x,l+x*(y-3)+1+(c)%x);
	}
}

function program(_idV,_idF)
{
	var v=gl.createShader(gl.VERTEX_SHADER);
	var vElement=document.getElementById(_idV);
	gl.shaderSource(v,vElement.text);
	gl.compileShader(v);
	if(!gl.getShaderParameter(v,gl.COMPILE_STATUS)){alert(gl.getShaderInfoLog(v));return;}

	var f=gl.createShader(gl.FRAGMENT_SHADER);
	var fElement=document.getElementById(_idF);
	gl.shaderSource(f,fElement.text);
	gl.compileShader(f);
	if(!gl.getShaderParameter(f,gl.COMPILE_STATUS)){alert(gl.getShaderInfoLog(f));return;}

	var p=gl.createProgram();
	gl.attachShader(p,v);
	gl.attachShader(p,f);
	gl.linkProgram(p);
	if(gl.getProgramParameter(p,gl.LINK_STATUS))
	{
		gl.useProgram(p);
		return p;
	}else{
		alert(gl.getProgramInfoLog(p));
	}
}

function create_vbo(data){
	var vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	return vbo;
}

function create_ibo(data){
	var ibo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	return ibo;
}

function setAtt(_n,_v,_s)
{
	var loc=gl.getAttribLocation(prg,_n);
	var str=_s;

	var vbo=create_vbo(_v);

	gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
	gl.enableVertexAttribArray(loc);
	gl.vertexAttribPointer(loc,str,gl.FLOAT,false,0,0);
}