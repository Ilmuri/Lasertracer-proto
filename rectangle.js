function Rectangle(x, y, width, height, angle) {
	
	WorldObject.call(this);
	
	this.position = vec3.fromValues(x,y,1);
	this.scale = vec2.fromValues(width*0.5, height*0.5);
	this.rotation = angle || 0;
	
	this.intersect = function(ray) {
	
		var localPosition = this.toLocal(vec3.fromValues(0,0,1), ray._position);
		var localDirection = this.toLocal(vec3.fromValues(0,0,0), ray._direction);
		
		
		var intersections = [];
		
		if(localDirection[0] != 0) {
			var t1 = (-1.0-localPosition[0]) / localDirection[0];
			var t2 = (1.0-localPosition[0]) / localDirection[0];
			
			var y1 = localPosition[1] + localDirection[1] * t1;
			var y2 = localPosition[1] + localDirection[1] * t2;
			
			
			if(y1 >= -1 && y1 <= 1) {
				
				var vec = vec3.fromValues(-1, 0, 0);
				intersections.push({t: t1, normal: vec});
			}
			if(y2 >= -1 && y2 <= 1) {
				
				var vec = vec3.fromValues(1, 0, 0);
				intersections.push({t: t2, normal: vec});
			}
		}
		if(localDirection[1] != 0) {
			var t1 = (-1.0-localPosition[1]) / localDirection[1];
			var t2 = (1.0-localPosition[1]) / localDirection[1];
			
			var x1 = localPosition[0] + localDirection[0] * t1;
			var x2 = localPosition[0] + localDirection[0] * t2;
			
			
			if(x1 >= -1 && x1 <= 1) {
				
				var vec = vec3.fromValues(0, -1, 0);
				intersections.push({t: t1, normal: vec});
			}
			if(x2 >= -1 && x2 <= 1) {
				
				var vec = vec3.fromValues(0, 1, 0);
				intersections.push({t: t2, normal: vec});
			}
		}
		
		
		if(intersections.length == 0) {
			return undefined;
		}
		
		var minIntersection = intersections[0];
		var minT = intersections[0].t;
		var maxIntersection = intersections[0];
		var maxT = intersections[0].t;
		
		for(var i in intersections) {
			
			if(minT > intersections[i].t) {
				
				minIntersection = intersections[i];
				minT = minIntersection.t;
			}
			
			if(maxT < intersections[i].t) {
				
				maxIntersection = intersections[i];
				maxT = maxIntersection.t;
			}
			vec3.normalize(intersections[i].normal, this.toWorld(intersections[i].normal, intersections[i].normal));
		}
		return new Interval(minT, maxT, minIntersection.normal, maxIntersection.normal, this);
	}
	
	this.draw = function(ctx) {
		ctx.rect(-1,-1, 2, 2);
		ctx.stroke();
	}
}