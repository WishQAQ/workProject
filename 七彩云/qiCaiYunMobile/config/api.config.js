const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isPro ? 'https://qcy.mynatapp.cc/numberone_auth_war_exploded/' : 'https://qcy.mynatapp.cc/numberone_auth_war_exploded/'
}
// 'http://192.168.0.109:80'
