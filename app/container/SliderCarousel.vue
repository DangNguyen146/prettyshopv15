<template>
  <Carousel
    ref="myCarousel"
    debug="true"
    height="350"
    width="100%"
    color="white"
    @pageChanged="myChangePageEvent"
    indicatorColor="#fff"
    indicatorOffset="0, -10"
    showIndicator="true"
  >
    <CarouselItem
      v-for="(item, i) in dataParse"
      :key="i"
      verticalAlignment="middle"
      @tap="myTapPageEvent"
    >
      <GridLayout columns="*" rows="auto, auto">
        <Image
          :src="item.image"
          :backgroundColor="item.color"
          stretch="aspectFill"
          height="350"
        />

        <Label
          :text="item.title"
          horizontalAlignment="center"
          backgroundColor="#50000000"
          height="30"
        />
      </GridLayout>
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  props: ["myData"],
  data() {
    return {
      dataParse: null,
    };
  },
  mounted() {
    const imagesArray = this.myData.split(";");
    this.dataParse = imagesArray.map((imageUrl) => {
      return { title: "", color: "#b3cde0", image: imageUrl };
    });
  },
};
</script>
