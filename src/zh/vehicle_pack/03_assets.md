---
order: 3
icon: book
---

# 资产准备

## 客户端资产
载具的模型、贴图，载具的物品栏图标，载具的音效，武器的音效...想必你已经准备好了

## 模型注意事项
载具使用基岩模型来渲染实体，关于基岩模型资产，有如下要点：
- 模型的朝向一定是Z轴正方向，即Minecraft中实体yaw为0时的朝向

   <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/prepare_assets1.png" style="width: 65%;">
  </div>

- 若无特殊需求，可动部件应不自带旋转，即绘制时就处在其默认朝向上

  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/prepare_assets2.png" style="width: 65%;">
  </div>

- 可动部件应独立按层级分组，活动自如

  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/prepare_assets3.png" style="width: 65%;">
  </div>

- 一些有动画需求的特殊部件有专用的分组和命名规则，如履带

  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/prepare_assets4.png" style="width: 65%;">
  </div>