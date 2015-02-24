function Caster(ray, objects) {
	
	this.ray = ray;
	this.points = [];
	this.objects = objects;
	
	this.cast = function() {
	
		this.points.push(this.ray.position);
		
		var minInterval;
		var lastObject;
		var rounds = 0;
		
		do {
		
			minInterval = undefined;
			for(var i in objects) {
				
				if(objects[i] != lastObject) {
					var obj = objects[i];
					var interval = obj.intersect(this.ray);
					
					if(interval !== undefined && interval.min>=0 && (minInterval === undefined || interval.min < minInterval.min)) {
					
						minInterval = interval;
					}
				}
			}
			
			if(minInterval !== undefined) {
				var entryPoint = this.ray.getPoint(minInterval.min);
				this.points.push(entryPoint);
				var refractedDirection = this.ray.refract(minInterval.minNormal, 1/minInterval.object.refractiveIndex);
				if(refractedDirection === undefined) {
					this.ray = new Ray(entryPoint, this.ray.reflect(minInterval.minNormal));
					lastObject = minInterval.object;
					//break;
				} else {
					var newRay = new Ray(this.ray.getPoint(minInterval.min), refractedDirection);
					var exitInterval = minInterval.object.intersect(newRay);
					if(exitInterval !== undefined) {
						var exitPoint = newRay.getPoint(exitInterval.max);
						var exitNormal = exitInterval.maxNormal;
						this.points.push(exitPoint);
						refractedDirection = newRay.refract(vec3.scale(vec3.create(),exitNormal,-1), minInterval.object.refractiveIndex);
						if(refractedDirection === undefined) {
							break;
						}
						this.ray = new Ray(exitPoint, refractedDirection);
					}
					lastObject = minInterval.object;
				}
			}
		
		} while(minInterval !== undefined);
		this.points.push(this.ray.getPoint(100));
	}
	
}