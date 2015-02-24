function Circle(pos, radius) {
	WorldObject.call(this);
	
	this.position = pos;
	
	
	Object.defineProperty(this, "radius", {
	get: function() {
		return this._radius;
	},
	set: function(value) {
		//this.scale = vec2.fromValues(value, value);
		this._radius = value;
	}
});
	
	this.intersect = function(ray) {
	
		var localPosition = this.toLocal(vec3.fromValues(0,0,1), ray._position);
		var localDirection = this.toLocal(vec3.fromValues(0,0,0), ray._direction);
		localPosition[2] = 0;
		//Obviously it's a quadratic equation.
		var A = vec3.dot(localDirection, localDirection);
		var A2 = A*2;
		var B = 2 * vec3.dot(localDirection, localPosition);
		var C = vec3.dot(localPosition, localPosition) - this._radius * this._radius;
		var determinant = B * B - 4 * A * C;
		
		if(determinant < 0) {
			return undefined;
		}
		var sqrtD = Math.sqrt(Math.abs(determinant));
		var t1= (sqrtD - B) / (A2);
		var t2= (-sqrtD - B) / (A2);
		
		var normal1 = vec3.create();
		vec3.normalize(normal1, this.toWorld(normal1, vec3.add(normal1, vec3.scale(normal1, vec3.copy(normal1, localDirection), t1), localPosition)));
		
		var normal2 = vec3.create();
		vec3.normalize(normal2, this.toWorld(normal2, vec3.add(normal2, vec3.scale(normal2, vec3.copy(normal2, localDirection), t2), localPosition)));
		
		
		if(t1<t2) {
			return new Interval(t1, t2, normal1, normal2, this);
		} else {
			return new Interval(t2, t1, normal2, normal1, this);
		}
	}
	
	this.draw = function(ctx) {
		ctx.arc(0,0, this._radius, 0, 2*Math.PI, false);
		ctx.stroke();
	}
	
	this.radius = radius;
	
}

