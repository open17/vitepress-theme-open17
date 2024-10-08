---
tags:
    - 数学
    - FFT
    - 多项式
title: 快速傅里叶变换(FFT)
date: 2024-03-12
bgImgDark: '/bg2_dark.jpg'

---


这个页面用于数学公式的展示

---

我们在计网中曾学过信号在时域和频域之间的转化需要傅里叶变换(Fourier Transform)


![介绍图](https://pic3.zhimg.com/v2-bb1427097bb4a91d4a78e384641ab8fa_b.webp)

而离散傅里叶变换(Discrete Fourier Transform，DFT),表示傅里叶变换在时域和频域上呈离散形式

而在算法竞赛上，DFT主要是用来解决多项式乘法等问题

FFT(快速傅里叶变换)即为优化版的DFT



## 前置知识

> 以处理多项式乘法为例

- 对于任意多项式,我们可以使用系数表示法,即按顺序排列其系数 $(a_0, a_1, a_2,..., a_n)$
- 对于一个n阶多项式,我们只需要n+1个点便可以确定(证明: 范德蒙特行列式)

所以要计算两个n阶多项式乘法$f(x),g(x)$,我们只需要在f(x)和g(x)上找2n+1个点,然后相乘即可表示出多项式乘法的结果

如果我们知道多项式f(x)的点值,也知道g(x)的点值,那么我们就可以通过O(1)计算出f(x)和g(x)的乘积多项式的点值
所以如果我们能以较低的时间复杂度内将系数表示法转化为点值表示法，再将点值表示法转回系数表示法，就能以较低的时间复杂度计算多项式的乘法

## 系数转点值

离散傅里叶变换通过在复平面上找特定的点以将系数转为点值,公式如下:

$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{i\frac{2\pi}{N}kn}$$

但是DFT没有很好使用单位根的性质,依然复杂度是$O(n^2)$的,这个时候我们可以使用FFT来优化为$O(nlogn)$

对于多项式$f(x)=a_0+a_1x^2+a_2x^3+...+a_{n}x^n$

我们可以拆分奇偶

$$f(x) = (a_0+a_2x^2+...+a_{n-1}x^{n-1}) + (a_1+a_3x^2+...+a_{n-1}x^{n-1})x$$


现在奇偶的系数都间隔为2,即$[0,2,4,...,n-1]$,无法点值表示,我们可以传入$x^2$使得系数间隔为1,即$[0,1,2,...,\frac{n-1}{2}]$,此时可以点值表示

所以:
$$f(x) = F_0(x^2) + F_1(x^2)x$$


现在我们发现$F_0$和$F_1$不也是一样的多项式吗,所以我们可以递归下去,直到系数为0


如何利用单位根的性质呢?


首先我们可以回忆一下单位根的性质

为了方便书写,我们用$\omega^k_n$表示n次单位根:
$$e^{i\frac{2\pi}{N}kn} = \omega^{nk}_N$$
此时有:
$$\omega^{k}_n = \omega^{ck}_{cn}$$

$$\omega^{k}_n = - \omega^{k+\frac{n}{2}}_{n}$$

$$\omega^0_n=\omega^n_n=1$$

因此:

$$f(x) = F_0(x^2) + F_1(x^2)x$$

$$f(\omega^k_n) = F_0(\omega^{2k}_n) + F_1(\omega^{2k}_n)\omega^k_n$$

$$f(\omega^k_n) = F_0(\omega^{k}_{\frac{n}{2}}) + F_1(\omega^{k}_{\frac{n}{2}})\omega^k_n $$

你可能会疑问但是这样递归下去依然没有减少计算量啊?

别忘了我们这里$F_1,F_0$都满足$g(x)=g(-x)$

同时这里还有个最重要的性质没用到:

$$\omega^{k}_n = - \omega^{k+\frac{n}{2}}_{n}$$
所以
$$f(\omega^{k+\frac{n}{2}}_n) = F_0(\omega^{k}_{\frac{n}{2}}) - F_1(\omega^{k}_{\frac{n}{2}})\omega^k_n $$

所以现在我们只需要计算一半的点即可得到$F_0(\omega^{k}_{\frac{n}{2}}),F_1(\omega^{k}_{\frac{n}{2}})$,然后相加即为前一半,相减即为后一半,这样计算量减半


所以如果我们知道对于点$[\omega^1_\frac{n}{2},\omega^2_\frac{n}{2},\omega^3_\frac{n}{2},...,\omega^n_\frac{n}{2}]$对应的$F_0,F_1$点值,我们就可以快速计算出$f(\omega^k_n)$的点值表达式

如何计算?还记得我们上面说的吗,递归即可

由此每次递归我们都会将子问题的计算规模减半,显然此时的复杂度即为$O(nlogn)$




## 点值转系数

在得到点值表达式后,我们可以通过FFT的逆变换得到系数表达式

我们先从DFT的逆变换IDFT开始推导

还记得前面的DFT公式吗?

$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{i\frac{2\pi}{N}kn}$$


我们可以把DFT公式视为矩阵乘法:

$$
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & \omega_N^1 & \omega_N^2 & \cdots & \omega_N^{N-1} \\
1 & \omega_N^2 & \omega_N^4 & \cdots & \omega_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & \omega_N^{N-1} & \omega_N^{2(N-1)} & \cdots & \omega_N^{{(N-1)}^2}
\end{bmatrix}
\space \space 
\begin{bmatrix}
a_0 \\
a_1 \\
a_2 \\
\vdots \\
a_{N-1}
\end{bmatrix}
{=}
\begin{bmatrix}
p_0 \\
p_1 \\
p_2 \\
\vdots \\
p_{N-1}
\end{bmatrix}
$$

其中$\begin{bmatrix} a_0 \\ a_1 \\ a_2 \\ \vdots \\ a_{N-1} \end{bmatrix}$ 为系数表达式,$\begin{bmatrix}p_0 \\ p_1 \\ p_2 \\ \vdots \\ p_{N-1} \end{bmatrix}$ 为点值表达式


所以如果我们要求系数表达式,只需要求原来的逆矩阵即可


注意到:

$$
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & \omega_N^1 & \omega_N^2 & \cdots & \omega_N^{N-1} \\
1 & \omega_N^2 & \omega_N^4 & \cdots & \omega_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & \omega_N^{N-1} & \omega_N^{2(N-1)} & \cdots & \omega_N^{{(N-1)}^2}
\end{bmatrix}^T{=}\frac{1}{N}
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & (\omega_N^1)^{-1} &  (\omega_N^2)^{-1} & \cdots &  (\omega_N^{N-1})^{-1} \\
1 &  (\omega_N^2)^{-1} &  (\omega_N^4)^{-1} & \cdots &  (\omega_N^{2(N-1)})^{-1} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 &  (\omega_N^{N-1})^{-1} &  (\omega_N^{2(N-1)})^{-1} & \cdots & (\omega_N^{{(N-1)}^2})^{-1}
\end{bmatrix}
$$

综上则有:

$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-i\frac{2\pi}{N}kn}$$


所以将一个多项式在分治的过程中乘上的单位根变为其共轭复数，分治完的每一项除以n即可得到原多项式的每一项系数

## 代码实现

### 详细步骤
<del>有时间补</del>

### 优化:蝴蝶变换
朴素FFT需要复制数组,并且是递归,常数较大
我们可以通过蝴蝶变换优化

板子来源[Pecco](https://zhuanlan.zhihu.com/p/128661674)

```cpp
// 非递归版FFT，确保N是2的整次幂
int rev[MAXN * 3];
const comp I(0, 1);
const double PI = acos(-1);
void fft(comp F[], int N, int sgn = 1)
{
    int bit = __lg(N);
    for (int i = 0; i < N; ++i) // 蝴蝶变换
    {
        rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (bit - 1));
        if (i < rev[i])
            swap(F[i], F[rev[i]]);
    }
    for (int l = 1; l < N; l <<= 1) // 枚举合并前的区间长度
    {
        comp step = exp(sgn * PI / l * I);
        for (int i = 0; i < N; i += l * 2) // 遍历起始点
        {
            comp cur(1, 0);
            for (int k = i; k < i + l; ++k)
            {
                comp g = F[k], h = F[k + l] * cur;
                F[k] = g + h, F[k + l] = g - h;
                cur *= step;
            }
        }
    }
}
// 逆变换记得在外部把实部除以N
```

## 更多
FFT在计算时会使用三角函数,因此无法避免运算时存在的精度误差

而NTT使用有限域上的单位根(即原根)代替复平面的单位根

因此NTT在计算时不会存在精度误差,且支持取模,并且常数似乎更小一点

<del>或许有空我会更新NTT的笔记</del>




## 参考文章
- [快速傅里叶变换（FFT）超详解](https://zhuanlan.zhihu.com/p/347091298)
- [超详细易懂FFT（快速傅里叶变换）及代码实现](https://blog.csdn.net/Flag_z/article/details/99163939)
- [算法学习笔记(32): 快速傅里叶变换](https://zhuanlan.zhihu.com/p/128661674)


## 参考视频

<iframe src="//player.bilibili.com/player.html?aid=203048598&bvid=BV1za411F76U&cid=262835785&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" loading="lazy" disallow="autoplay" style="width: 100%;height:60vh"></iframe>


