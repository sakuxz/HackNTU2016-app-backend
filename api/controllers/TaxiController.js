/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne: async (req, res) => {
		try{
			let result = await Taxi.findOrCreate({
				where: req.query,
				include: [Rank]
			});
			let targetTaxi = result[0].toJSON();
			targetTaxi.scoreSum = 0;
			targetTaxi.avg = 0;
			if(targetTaxi.Ranks){
				targetTaxi.Ranks.forEach((e)=>{
					targetTaxi.scoreSum += e.score;
				});
				targetTaxi.avg = targetTaxi.scoreSum/targetTaxi.Ranks.length
			}
      res.ok({
				data: targetTaxi
			});
		}catch(e){
			console.log(e);
			res.badRequest(e);
		}
	},

	findAll: async (req, res) => {
		try{
			let result = await Taxi.findAll({
				include: [Rank]
			});
      res.ok({
				data: result
			});
		}catch(e){
			console.log(e);
			res.badRequest(e);
		}
	},

	rank: async (req, res) => {
		try{
			let targetTaxi = await Taxi.findOrCreate({
				where: {
					plate_no: req.body.plate_no,
				}
			});
			let result = await Rank.create({
				TaxiId: targetTaxi[0].id,
				score: req.body.score
			});
			res.ok({
				data: result
			});
		}catch(e){
    	console.log(e);
			res.badRequest(e);
		}
	},

	checkTaxi: async (req, res) => {
		try{
      if(!req.query.plate_no){
				res.ok({
					safe: false
				});
				return;
			}
			let $ = await TaxiService.getJQ(req.query.plate_no);
			console.log('text==>'+$('#headerMessage').text());
			if(	$('#headerMessage').text() !== "" || $('div.cont90 > table > tbody > tr:nth-child(7) > td').text() === '繳銷' ){
				res.ok({
					safe: false
				})
			}else{
				res.ok({
					safe: true
				})
			}
		}catch(e){
			console.log(e);
		}
	}

};
