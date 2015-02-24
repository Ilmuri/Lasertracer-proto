function Interval(min, max, minNormal, maxNormal, object) {
	
	this.min = min;
	this.max = max;
	this.minNormal = minNormal;
	this.maxNormal = maxNormal;
	this.object = object;
	
	this.intersect = function(b) {
		var min = Math.max(this.min, b.min);
		var max = Math.min(this.max, b.max);
		var minNormal;
		var maxNormal;
		if(max<min) {
			return undefined;
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
		return new Interval(min, max, minNormal, maxNormal);
	}
	this.difference = function(b) {
	
		if(this.max < b.min || b.max < this.min) {
			
			return [new Interval(this.min, this.max, this.minNormal, this.maxNormal)];
		}
		
		if(b.min < this.min && b.max > this.max) {
			
			return [];
		}
		
		if(this.min < b.min && this.max > b.max) {
			
			return [
				new Interval(this.min, b.min, this.minNormal, vec3.negate(vec3.create(), b.minNormal)),
				new Interval(b.max, this.max, vec3.negate(vec3.create(), b.maxNormal), this.maxNormal)
			];
		}
		
		if(this.min < b.min) {
		
			return [new Interval(this.min, b.min, this.minNormal, vec3.negate(vec3.create(), b.minNormal))];
		} else {
			
			return [new Interval(b.max, this.max, vec3.negate(vec3.create(), b.maxNormal), this.maxNormal)];
		}
	}
}