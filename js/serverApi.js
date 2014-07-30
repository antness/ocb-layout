(function($, _){

	var ServerApi = {
		getUserInfo: function(){
			var userInfo = getUserInfo();
			return $.when(userInfo).then(emulateServerDelay);
		},
		login: function(params){
			if(params.login === 'user' && params.password === '123123')
			{
				serverState.user = {
					name: 'user',
					balance: 123.6
				};
				return $.when(getUserInfo()).then(emulateServerDelay);
			}
			else
			{
				return $.Deferred().reject('Auth error').promise();
			}
		},
		logout: function(){
			serverState.user = null;
			return $.when(true).then(emulateServerDelay);
		},
		listSections: function(){
			var sections = _.map(serverState.sections, function(section){ return _.pick(section, 'id', 'title'); });
			return $.when(sections).then(emulateServerDelay);
		},
		listFilters: function(sectionId){
			var section = _.findWhere(serverState.sections, {id: sectionId});
			if(_.isUndefined(section))
				return $.Deferred().reject('Section not found').promise();
			var filters = _.map(section.filters, function(filter){ return _.pick(filter, 'id', 'title'); });
			return $.when(filters).then(emulateServerDelay);
		},
		listGames: function(sectionId, filterId){
			var section = _.findWhere(serverState.sections, {id: sectionId});
			if(_.isUndefined(section))
				return $.Deferred().reject('Section not found').promise();
			var filter = _.findWhere(section.filters, {id: filterId});
			if(_.isUndefined(filter))
				return $.Deferred().reject('Filter not found').promise();

			return $.when(filter.games).then(emulateServerDelay);
		}
	};

	var serverState = {
		user: null,
		sections: [
			{id: 1, title: 'Популярные'},
			{id: 2, title: 'IgroSoft'},
			{id: 3, title: 'Novomatic'},
			{id: 4, title: 'NetEnt'},
			{id: 5, title: '3D Slots'},
			{id: 6, title: 'Прочие игры'},
			{id: 7, title: 'Казино'}
		]
	};

	var sampleFilters = [
		{id: 1, title: 'Featured'},
		{id: 2, title: '1-15 lines'},
		{id: 3, title: '20-25 lines'},
		{id: 4, title: '30 lines +'},
		{id: 5, title: 'All Games'}
	];

	var sampleGames = [
		{id: 1, title: 'Thrill Spin', description: '15 lines video slot'},
		{id: 2, title: 'Throlls', description: '15 lines video slot'},
		{id: 3, title: 'Viking`s Treasure', description: '25 lines video slot'},
		{id: 4, title: 'Voodoo Vibes', description: '25 lines video slot'},
		{id: 5, title: 'Pandora`s Box', description: '25 lines video slot'},
		{id: 6, title: 'Excalibur', description: '25 lines video slot'},
		{id: 7, title: 'Pacific Attack!', description: '25 lines video slot'},
		{id: 8, title: 'Mystery at the Mansion', description: '25 lines video slot'},
		{id: 9, title: 'Tales of Krakow', description: '25 lines video slot'},
		{id: 10, title: 'Hot City', description: '25 lines video slot'},
		{id: 11, title: 'Super Lucky Frog', description: '25 lines video slot'},
		{id: 12, title: 'FortuneTeller', description: '25 lines video slot'},
		{id: 13, title: 'Diamond Dogs', description: '25 lines video slot'},
		{id: 14, title: 'Blood Suckers', description: '25 lines video slot'},
		{id: 15, title: 'Crusade of Fortune', description: '25 lines video slot'},
		{id: 16, title: 'Mega Fortune', description: '25 lines video slot'},
		{id: 17, title: 'Tiki Wonders', description: '25 lines video slot'},
		{id: 18, title: 'Geisha Wonders', description: '25 lines video slot'},
		{id: 19, title: 'Icy Wonders', description: '25 lines video slot'},
		{id: 20, title: 'Arabian Nights', description: '25 lines video slot'},
		{id: 21, title: 'Fishy Fortune', description: '25 lines video slot'},
		{id: 22, title: 'Reel Steal', description: '25 lines video slot'},
		{id: 23, title: 'Dead or Alive', description: '25 lines video slot'},
		{id: 24, title: 'Devil`s Delight', description: '25 lines video slot'},
		{id: 25, title: 'Ghost Pirates', description: '25 lines video slot'},
		{id: 26, title: 'Piggy Riches', description: '25 lines video slot'},
		{id: 27, title: 'Wild Turkey', description: '25 lines video slot'},
		{id: 28, title: 'Gonzo`s Quest', description: '25 lines video slot'},
		{id: 29, title: 'Flowers', description: '25 lines video slot'},
		{id: 30, title: 'Jack Hammer', description: '25 lines video slot'}
	];

	var sampleImages = [
		'1.png',
		'2.png',
		'3.png',
		'4.png',
		'5.png',
		'6.png',
		'7.png',
		'8.png',
		'9.png',
		'10.png'
	];

	_.each(sampleGames, function(game){
		game.image = _.sample(sampleImages);
	});

	_.each(serverState.sections, function(section){
		section.filters = _.sample(sampleFilters, _.random(2, 5));
		_.each(section.filters, function(filter){
			filter.games = _.sample(sampleGames, _.random(10, 25));
		});
	});

	function getRandomTimeout(){
		return Math.floor(300 + Math.random() * 800);
	}

	function emulateServerDelay(value){
		var d = $.Deferred();
		setTimeout(function(){
			d.resolve(value);
		}, getRandomTimeout());
		return d.promise();
	}

	function getUserInfo(){
		if(serverState.user === null)
			return false;
		var userInfo = {
			name: serverState.user.name,
			balance: serverState.user.balance
		};
		return userInfo;
	}

	window.ServerApi = ServerApi;
})(jQuery, _);

