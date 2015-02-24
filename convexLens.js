function ConvexLens() {
	
	WorldObject.call(this);

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