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
		
			console.log(rounds++, this.ray._direction);
			minInterval = undefined;
			for(var i in objects) {
				
				if(objects[i] != lastObject) {
					console.log("maybe", objects[i]);
					var obj = objects[i];
					var interval = obj.intersect(this.ray);
					
					if(interval !== undefined && interval.min>=0 && (minInterval === undefined || interval.min < minInterval.min)) {
					
						minInterval = interval;
					}
				} else {
					console.log("skipping last object", objects[i]);
				}
			}
			
			if(minInterval !== undefined) {
				console.log("hit", minInterval.object);
				this.points.push(this.ray.getPoint(minInterval.min));
				var refractedDirection = this.ray.refract(minInterval.minNormal, 1/minInterval.object.refractiveIndex);
				console.log("entry ref", refractedDirection);
				if(refractedDirection === undefined) {
					break;
				}
				var newRay = new Ray(this.ray.getPoint(minInterval.min), refractedDirection);
				var exitInterval = minInterval.object.intersect(newRay);
				var exitPoint = newRay.getPoint(exitInterval.max);
				var exitNormal = exitInterval.maxNormal;
				this.points.push(exitPoint);
				refractedDirection = newRay.refract(vec3.scale(vec3.create(),exitNormal,-1), minInterval.object.refractiveIndex);
				console.log("exit ref", refractedDirection);
				if(refractedDirection === undefined) {
					break;
				}
				this.ray = new Ray(exitPoint, refractedDirection);
				console.log(this.ray);
				lastObject = minInterval.object;
			}
		
		} while(minInterval !== undefined);
		this.points.push(this.ray.getPoint(100));
		console.log("ended casting");
	}
	
}