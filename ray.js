function Ray(pos, dir) {

	this._position = pos || vec3.fromValues(0,0,1);
	this._direction = dir || vec3.fromValues(0,0,0);
	
	Object.defineProperty(this, "position", {
		get: function() {
			return vec3.clone(this._position);
		},
		set: function(v) {
			vec3.copy(this._position, v);
		}
	});
	
	this.getPoint = function(t) {
		
		var point = vec3.create();
		return vec3.add(point, this._position, vec3.scale(point, vec3.copy(point, this._direction),t));
	}
	
	this.refract = function(normal, refractiveRatio){
		
		var n = vec3.clone(normal);
		var c = vec3.dot(vec3.scale(n,n,-1), this._direction);
		var temp = refractiveRatio * c - Math.sqrt(1-refractiveRatio*refractiveRatio*(1-c*c));
		if(isNaN(temp)) {
			return undefined;
		}
		n = vec3.clone(normal);
		var d = vec3.clone(this._direction);
		return vec3.add(d, vec3.scale(d, d, refractiveRatio), vec3.scale(n, n, temp));
	}
	this.reflect = function(normal) {
	
		var dot = vec3.dot(normal, this._direction);
		return vec3.subtract(vec3.clone(_direction), vec3.scale(vec3.clone(normal),2*dot));
	}
}