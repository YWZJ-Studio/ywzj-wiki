---
order: 6
icon: book
---

# 结构模型
基岩模型似乎只能用于渲染，但YWZJ创新性地使用它来描述逻辑结构，服务端也因此需要加载存放于`data/tutorial/models/bedrock/vehicle/载具名.structure.json`的**结构模型**文件，其以载具配置的`structure_model`参数体现
```
"structure_model": "ywzj_vehicle:vehicle/ztz99a"
```
**结构模型**的具象化是OBB，其广泛用于物理碰撞、精细命中、方位逻辑表达等场景
::: tip
考虑计算复杂度，载具目前仅使用车体结构中最大的OBB来表现整体运动的物理效果
:::

## 关于OBB
方向包围盒OBB（Oriented Bounding Box）是一种任意朝向的立方体状数学描述

基岩模型中的每一个块都可以视作一个OBB。在载具中，对于一个OBB，其三维可以描述一个部件的碰撞体积，其枢轴可以描述部件的方向机，其上一点可以描述成座位、镜头等随动点

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/obb.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">OBB表现的车体、炮塔、炮管等</p>
</div>

::: tip
在YWZJ中，许多配置的自动计算都依赖于OBB，如玩家的乘坐位置、武器的炮口位置等
:::

## 开发工具
文档撰写的目前，大部分载具模组的OBB配置往往基于代码硬编码或特殊格式，开发非常不便。YWZJ因**使用基岩模型描述OBB**，Blockbench下即可自由绘制OBB
<div style="text-align: center;">
  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/model_in_bb.png" style="width: 45%;">
    <img src="/images/obb_in_bb.png" style="width: 45%;">
  </div>
  <p style="margin-top: 10px; font-size: 13px">Blockbench中的载具模型与结构模型</p>
</div>

## 分组与枢轴
与渲染用的**视觉模型**类似，**结构模型**也需要良好**分组**，并且**枢轴**位置关系与**视觉模型**一致，才可保证在复杂旋转时OBB的逻辑方向与载具的视觉方向一致

::: tip
**结构模型**中的组名有专用含义，如`vehicle_body`专属于车体，而其他组名与前文中载具`part`配置中的`structure_bone`参数对应，用于表达一个载具部件，如`turret`代表炮塔
:::
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/obb_groups.png" style="width: 80%;">
</div>

在本例中，显然，炮塔自身的炮管、炮塔的同轴机枪、高射机枪、烟雾弹发射器都是附着在炮塔上的，因此**结构模型**中，它们对应的部件OBB也分属于炮塔OBB的组下

若有更复杂的部件运动关系（~~比如多炮塔神教~~），显然需要更深层嵌套的OBB组来描述它们
::: tip
武器单元是特殊的载具部件，其炮管与座圈分属于两个枢轴，因此需两个组来描述，其中约定名为`部件名_barrel`的组属于炮管组，如`turret_barrel`就是主炮塔的炮管组
:::

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/draw_obb1.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">你可以直接在视觉模型上拖拽拉伸绘制结构模型</p>
</div>

枢轴对齐是本章稍显费力的环节，因为基岩模型中，枢轴是嵌套递归计算绝对位置的，所以**视觉模型**中某结构的枢轴坐标往往不能直接抄给**结构模型**
<div style="text-align: center;">
  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/draw_obb2.png" style="width: 45%;">
    <img src="/images/draw_obb3.png" style="width: 45%;">
  </div>
  <p style="margin-top: 10px; font-size: 13px">炮塔的枢轴在视觉模型与结构模型的位置保持一致</p>
</div>