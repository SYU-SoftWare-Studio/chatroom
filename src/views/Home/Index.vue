<template>
  <div class="home">
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        :action="domain"
        :http-request="upqiniu"
        list-type="picture"
        :show-file-list="false"
        :before-upload="beforeUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import SYU from '../../../engine';

export default {
  name: 'Home',
  data() {
    return {
      imageUrl: '',
      token: {},
      domain: 'https://upload-z2.qiniup.com',
    };
  },
  methods: {
    async upqiniu(req) {
      this.imageUrl = await SYU.uploadPic(req);
    },

    beforeUpload(file) {
      const legalVal = ['jpeg', 'jpg', 'png', 'gif'];
      const isJPG = legalVal.includes(file.type.split('/')[1]);
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('所上传图片的格式只能为 jepg,jpg,png,gif');
      }
      if (!isLt2M) {
        this.$message.error('所上传图片大小不能超过 4MB');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
