import Alarm from '../../models/alarm';
import User from '../../models/user';

export const addToken = async (ctx) => {
  const { token, user, item } = ctx.request.body;
  const alarm = new Alarm({
    token,
    item,
    user,
  });
  const query = {
    ...(user ? { _id: user._id } : {}),
    ...(item ? { 'alarm._id': item._id } : {}),
  };
  try {
    //await User.findByIdAndUpdate(user._id, { $push: { alarm: item } });
    const toggle = await User.find(query);
    console.log(toggle.length);
    if (toggle.length !== 0) {
      console.log('삭제');
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { alarm: item } },
        { new: true },
      ).exec();

      //const result = await User.findById(user._id,{alarm:1})
      await Alarm.deleteOne({'user._id':user._id},{'item._id':item._id});
      ctx.status = 204;
    } else {
      console.log('추가');
      await User.findByIdAndUpdate(
        user._id,
        { $push: { alarm: item } },
        { new: true },
      ).exec();
      await alarm.save();
      //const result = await User.findById(user._id,{alarm:1})
      ctx.status = 204;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const readData = async (ctx) => {
  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate() + 1; //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '.' + month + '.' + day;
  }
  try {
    var date = new Date();
    let tomorrow = getFormatDate(date);
    const alarm = await Alarm.find({
      'item.days': tomorrow,
    });
/*     ctx.body = alarm.map((post) => ({
      ...post,
      body: post.body,
    })); */
    if (!alarm) {
      ctx.status = 404;
      return;
    }
    //ctx.status = 204;
    ctx.body = alarm;
  } catch (error) {
    ctx.throw(500, error);
  }
};
