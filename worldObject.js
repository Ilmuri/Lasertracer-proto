function WorldObject() {
	
	this._position = vec3.create();
	this._rotation = 0.0;
	this._scale = vec2.fromValues(1,1);
	this._toLocal = mat3.create();
	this._toWorld = mat3.create();
	this._invalidMatrices = true;
	this.refractiveIndex = 1.52;
	
	this.invalidateMatrices = function() {
		this._invalidMatrices = true;
	}

	this.updateMatrices = function() {
		mat3.identity(this._toLocal);
		mat3.identity(this._toWorld);
		mat3.translate(this._toWorld, this._toWorld, this._position);
		mat3.rotate(this._toWorld, this._toWorld, -this._rotation);
		mat3.scale(this._toWorld, this._toWorld, this._scale);
		
		mat3.invert(this._toLocal, this._toWorld);
	}
	this.toLocal = function(out, v) {
		if(this._invalidMatrices) {
			this.updateMatrices();
		}
		return vec3.transformMat3(out, v, this._toLocal);
	}
	this.toWorld = function(out, v) {
		if(this._invalidMatrices) {
			this.updateMatrices();
		}
		return vec3.transformMat3(out, v, this._toWorld);
	}

	Object.defineProperty(this, "position", {
		get: function() {
			return vec3.clone(this._position);
		},
		set: function(v) {
			vec3.copy(this._position, v);
			this.invalidateMatrices();
		}
	});


	Object.defineProperty(this, "rotation", {
		get: function() {
			return this._rotation;
		},
		set: function(value) {
			this._rotation = value;
			this.invalidateMatrices();
		}
	});

	Object.defineProperty(this, "scale", {
		get: function() {
			return vec2.clone(this._scale);
		},
		set: function(v) {
			vec2.copy(this._scale, v);
			this.invalidateMatrices();
		}
	});
}