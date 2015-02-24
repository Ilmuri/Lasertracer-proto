function ConvexLens() {

	WorldObject.call(this);

	this.objs = [
		new Rectangle(0,0,2,2.5),
		new Circle(vec3.fromValues(-2,0,1), 2.5),
		new Circle(vec3.fromValues(5,0,1), 5.5)
	];
	this.operations = ["set", "intersect", "intersect"];
	
	this.intersect = function(ray) {
		
		var localPosition = this.toLocal(vec3.create(), ray._position);
		var localDirection = this.toLocal(vec3.create(), ray._direction);
		
		var localRay = new Ray(localPosition, localDirection);
		
		var intervals = [];
		
		for(var i = 0; i < this.objs.length; i++) {
			
			var interval = this.objs[i].intersect(localRay);
			intervals.push({interval: interval, operation: this.operations[i]});
		}
		
		var interval = intervals[0].interval;
		var finalInterval = interval===undefined?new Interval(undefined,undefined,undefined,undefined,this):new Interval(interval.min, interval.max, interval.minNormal, interval.maxNormal, this);
		
		if(finalInterval === undefined) {
		
			return undefined;
		}
		
		for(var i = 1; i < intervals.length; i++) {
		
			if(intervals[i].operation) {
				finalInterval = finalInterval[intervals[i].operation].call(finalInterval, intervals[i].interval);
			}
		}
		
		
		return finalInterval;
	}
	
	this.draw = function(ctx) {
	
		ctx.rect(-1,-1,2,2);
		ctx.stroke();
	}

	function getConvexLensIntersection(rayPos, rayDir, circles) {
		
		var interval1 = rayCircleIntersection(rayPos, rayDir, circles[0]);
		var interval2 = rayCircleIntersection(rayPos, rayDir, circles[1]);
		
		if(!!interval1 && !!interval2) {
			return intervalIntersection(interval1, interval2);
		}
		
		return undefined;
	}
	
	function getLensCircles(centerX, centerY, halfWidth, halfHeight) {
		
		var dist = (halfHeight*halfHeight-halfWidth*halfWidth)/(halfWidth);
		var radius = dist+halfWidth;
		var circle1 = new Circle(vec3.fromValues(centerX-dist, centerY, 1), radius);
		var circle2 = new Circle(vec3.fromValues(centerX+dist, centerY, 1), radius);
		return [circle1, circle2];
	}
}