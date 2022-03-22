module.exports = {
    apps : [{
      name: 'demeter-api-server',
      script: 'app.js',
      watch: false,
      env:{
        NODE_ENV: 'development',
  
      },
      env_production:{
        NODE_ENV: 'production'
      }
  
    }
  ],
  
    deploy : {
      production : {
        user : 'root',
        host : '121.5.15.192',
        ref  : 'origin/main',
        repo : 'https://github.com/francisZC/Demeter_server.git',
        path : '/var/www/production',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
};
  