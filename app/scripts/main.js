$(function() {
			var data = {
				label: 'Super total',
				amount: 200,
				color: '#ccc',  // color for root node, will be inherited by children
				children: [
					{ label: 'First child', amount: 40, color: '#ff0000',
						children: [
							{ label: 'Employee A', amount: 10},
							{ label: 'Employee B', amount: 10},
							{ label: 'Employee C', amount: 20}
						]
					},
					{ label: 'Second child', amount: 80, color: '#00ff00',
						children: [
							{ label: 'Employee D', amount: 30},
							{ label: 'Employee E', amount: 40},
							{ label: 'Employee F', amount: 10}
						]
					},
					{ label: 'Third child', amount: 80, color: '#0000ff',
						children: [
							{ label: 'Employee G', amount: 20},
							{ label: 'Employee H', amount: 50},
							{ label: 'Employee I', amount: 10}
						]
					}
				]
			};
			new BubbleTree({
				data: data,
				container: '.bubbletree'
			});
		});