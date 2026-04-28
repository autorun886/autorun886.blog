const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

hexo.extend.deployer.register('qiniu', function(args) {
  const log = this.log;
  const publicDir = this.public_dir;

  // 获取配置
  const config = {
    accessKey: args.accessKey,
    secretKey: args.secretKey,
    bucket: args.bucket,
    zone: args.zone || 'z0',
    prefix: args.prefix || '',
    isOverwrite: args.isOverwrite !== false
  };

  // 验证配置
  if (!config.accessKey || !config.secretKey || !config.bucket) {
    log.error('七牛云配置不完整，请检查 _config.yml 中的 deploy 配置');
    return Promise.reject(new Error('配置不完整'));
  }

  log.info('开始部署到七牛云...');
  log.info(`Bucket: ${config.bucket}`);
  log.info(`Zone: ${config.zone}`);

  // 配置七牛云
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
  const qiniuConfig = new qiniu.conf.Config();

  // 设置区域
  const zoneMap = {
    z0: qiniu.zone.Zone_z0,  // 华东
    z1: qiniu.zone.Zone_z1,  // 华北
    z2: qiniu.zone.Zone_z2,  // 华南
    na0: qiniu.zone.Zone_na0, // 北美
    as0: qiniu.zone.Zone_as0  // 东南亚
  };
  qiniuConfig.zone = zoneMap[config.zone] || qiniu.zone.Zone_z0;

  const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
  const putExtra = new qiniu.form_up.PutExtra();

  // 生成上传凭证
  function getUploadToken(key) {
    const options = {
      scope: config.isOverwrite ? `${config.bucket}:${key}` : config.bucket,
      expires: 3600
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }

  // 上传单个文件
  function uploadFile(filePath, key) {
    return new Promise((resolve, reject) => {
      const uploadToken = getUploadToken(key);
      const readableStream = fs.createReadStream(filePath);

      formUploader.putStream(uploadToken, key, readableStream, putExtra, (err, body, info) => {
        if (err) {
          reject(err);
        } else if (info.statusCode === 200) {
          log.info(`✓ ${key}`);
          resolve(body);
        } else {
          reject(new Error(`上传失败: ${info.statusCode} - ${JSON.stringify(body)}`));
        }
      });
    });
  }

  // 获取所有需要上传的文件
  const files = glob.sync('**/*', { cwd: publicDir, nodir: true });
  log.info(`找到 ${files.length} 个文件需要上传`);

  // 批量上传文件
  const uploadPromises = files.map(file => {
    const filePath = path.join(publicDir, file);
    const key = config.prefix ? path.join(config.prefix, file) : file;
    return uploadFile(filePath, key);
  });

  return Promise.all(uploadPromises)
    .then(() => {
      log.info('部署完成！');
    })
    .catch(err => {
      log.error('部署失败:', err);
      throw err;
    });
});
