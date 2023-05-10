<template>
    <Carousel ref="myCarousel" debug="true" height="200" width="100%" color="white" @pageChanged="myChangePageEvent"
        indicatorColor="#fff" indicatorOffset="0, -10" showIndicator="true">
        <CarouselItem v-for="(item, i) in myData" :key="i" :backgroundColor="item.color" verticalAlignment="middle"
            @tap="myTapPageEvent">
            <GridLayout columns="*" rows="auto, auto">
                <Image :src="item.image" stretch="aspectFill" />
                <Label :text="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30" />
            </GridLayout>
        </CarouselItem>
    </Carousel>
</template>
<script>

export default{
    props: ["myData"],
}
</script>