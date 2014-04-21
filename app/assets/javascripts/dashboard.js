new Morris.Donut({
	element: 'donut',
	  data: [
	    {label: "Beer", value: 12},
	    {label: "Wine", value: 30},
	    {label: "Others", value: 20}
	  ]
});

Morris.Area({
  element: 'area',
  data: [
    { y: '2008', a: 12, b: 18 },
    { y: '2009', a: 53,  b: 47 },
		{ y: '2010', a: 63,  b: 117 },
		{ y: '2011', a: 103,  b: 25 },
		{ y: '2012', a: 4,  b: 15 }
  ],
  xkey: 'y',
  ykeys: ['a', 'b'],
  labels: ['Tablet 1', 'Tablet 2']
});

new Morris.Line({
  element: 'order_detail',
	data: [
	    { year: '2008', value: 20 },
	    { year: '2009', value: 10 },
	    { year: '2010', value: 5 },
	    { year: '2011', value: 5 },
	    { year: '2012', value: 20 }
	  ],
  xkey: 'year',
  ykeys: ['value'],
  labels: ['Value']
});
