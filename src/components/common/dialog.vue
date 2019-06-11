<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <img class="dialog-container-img" @click="closeBtn" src="../../../static/test/guanbi.png" alt>
            <div class="dialog-title">{{title}}</div>
            <div class="dialog-title-button"></div>
            <div class="list-button-dialog" v-for="(item,index) in content" :key="index">
                  <button class="list-button-dialog-1" v-if="item.code!=0" @click="tishi()">{{item.name}}</button>
                  <button class="list-button-dialog-0" v-else @click="openEaxm(item.id)">{{item.name}}</button>
            </div>
            <!-- <div class="btns">
                <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
            </div> -->
            <!-- <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div> -->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: Array,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        tishi(){
            this.$message('该章节考试已合格，请选择其它章节考试！');
        },
        openEaxm(examId){
            this.$emit('openExam',examId);
        },
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.closeMask();
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            width: 500px;
            height: 380px;
            padding: 10px 10px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
        overflow-y: auto;
            .dialog-container-img{
                width: 20px;
                height: 20px;
                float:right;
            }
            .dialog-title{
                width: 20%;
                font-size: 16px;
                text-align: center;
                box-sizing: border-box;
                white-space: nowrap;
                margin: 10px auto;
                padding-top: 20px;
            }
            .dialog-title-button{
                width: 10%;
                border-bottom: 1px solid #c7000a;
                margin: 10px auto;
            }
           .list-button-dialog{
               width: 92%;
               margin: 10px auto;
           >button{
               width: 130px;
               font-size: 13px;
               text-align: center;
                    padding: 8px 0px;
    border: 0px;
    color: white;
    border-radius: 3px;
    float: left;
    margin: 11px;
            }
            .list-button-dialog-1{
             background-color: #c7000a;
            }
            .list-button-dialog-0{
             background-color: #999999;
            }
           }
            .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                height: 60px;
                // line-height: 60px;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    &:hover{
                        color: #509EE3; 
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                    &:hover{
                        background: #6FB0EB;
                    }
                }
            }
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
    }
</style>
