function Interval(min, max, minNormal, maxNormal, object) {
	
	this.min = min;
	this.max = max;
	this.minNormal = minNormal;
	this.maxNormal = maxNormal;
	this.object = object;
	
	this.intersect = function(b) {
		if(b === undefined || this.min === undefined || this.max === undefined || b.min === undefined || b.max === undefined) {
			
			return new Interval(undefined, undefined, undefined, undefined, this.object);
		}
		var min = Math.max(this.min, b.min);
		var max = Math.min(this.max, b.max);
		var minNormal;
		var maxNormal;
		if(max<min) {
			return new Interval(undefined, undefined, undefined, undefined, this.object);
		}
		if(this.min>b.min) {
			minNormal = this.minNormal;
		}else {
			minNormal = b.minNormal;
		}
		if(this.max<b.max) {
			maxNormal = this.maxNormal;
		}else {
			maxNormal = b.maxNormal;
		}
		return new Interval(min, max, minNormal, maxNormal, this.object);
	}
	this.difference = function(b) {
	
		if(this.max < b.min || b.max < this.min) {
			
			return [new Interval(this.min, this.max, this.minNormal, this.maxNormal, this.object)];
		}
		
		if(b.min < this.min && b.max > this.max) {
			
			return [];
		}
		
		if(this.min < b.min && this.max > b.max) {
			
			return [
				new Interval(this.min, b.min, this.minNormal, vec3.negate(vec3.create(), b.minNormal, this.object)),
				new Interval(b.max, this.max, vec3.negate(vec3.create(), b.maxNormal), this.maxNormal, this.object)
			];
		}
		
		if(this.min < b.min) {
		
			return [new Interval(this.min, b.min, this.minNormal, vec3.negate(vec3.create(), b.minNormal), this.object)];
		} else {
			
			return [new Interval(b.max, this.max, vec3.negate(vec3.create(), b.maxNormal), this.maxNormal, this.object)];
		}
	}
	this.set = function(other) {
	
		this.min = other.min;
		this.max = other.max;
		this.minNormal = other.minNormal;
		this.maxNormal = other.maxNormal;
	}
}